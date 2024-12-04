import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { LessThan, Repository } from 'typeorm';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';

import { throwHttpException } from 'src/core';
import { OTPServiceInterface } from './otp.service.interface';
import { GenerateOTPDto, VerifyOTPDto } from 'src/auth/dto';
import { OTP } from '../../entities';

@Injectable()
export class OTPService implements OTPServiceInterface {
  constructor(
    @InjectRepository(OTP) private _otpRepository: Repository<OTP>,
    private _configService: ConfigService,
    private _mailService: MailerService,
  ) {}

  async findOne(filters: Partial<OTP>): Promise<OTP | null> {
    return this._otpRepository.findOne({ where: filters });
  }

  async generateOTP({ email }: GenerateOTPDto): Promise<void> {
    const EXISTING_OTP = await this.findOne({ email });

    if (EXISTING_OTP) {
      this._otpRepository.remove(EXISTING_OTP);
    }

    const TOKEN = this._generateToken();
    const OTP = this._otpRepository.create({
      email,
      otp: await bcrypt.hash(TOKEN, 10),
      expiresAt: new Date().toISOString(),
    });

    await this._sendEmail(email, TOKEN);
    await this._otpRepository.save(OTP);
  }

  async verifyOTP({ otp, email }: VerifyOTPDto): Promise<void> {
    const OTP = await this.findOne({ email });

    if (
      !OTP ||
      OTP.expiresAt < new Date() ||
      !(await bcrypt.compare(otp, OTP.otp))
    ) {
      throwHttpException(
        HttpStatus.UNAUTHORIZED,
        'the OTP is invalid or has expired',
      );
    }

    this._otpRepository.remove(OTP);
  }

  private _generateToken(): string {
    const SECRET = this._configService.get('OTP_SECRET');
    const TOKEN = speakeasy.totp({
      secret: SECRET,
      digits: 6,
      encoding: 'hex',
    });

    return TOKEN;
  }

  private async _sendEmail(
    email: string,
    token: string,
  ): Promise<SentMessageInfo> {
    const TO =
      this._configService.get('APP_ENV') === 'dev'
        ? this._configService.get('SMTP_TEST_RECIPIENT')
        : email;

    return await this._mailService.sendMail({
      to: TO,
      subject: 'Please verify your email address',
      text: `Your One Time Password (OTP) is: ${token}. It will be valid for the next 2 mintues. Please do not share it with anyone.`,
    });
  }

  @Interval(5 * 60 * 1000)
  private async _cleanExpiredOTP(): Promise<void> {
    const OTP = await this._otpRepository.find({
      where: { expiresAt: LessThan(new Date()) },
    });

    if (OTP?.length) {
      this._otpRepository.remove(OTP);
    }
  }
}
