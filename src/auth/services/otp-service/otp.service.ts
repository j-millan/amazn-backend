import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Interval } from '@nestjs/schedule';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';

import { throwHttpException } from 'src/core';
import { OTPServiceInterface } from './otp.service.interface';
import { GenerateOTPDto, VerifyOTPDto } from 'src/auth/dto';
import { OTP } from '../../entities';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OTPService implements OTPServiceInterface {
  constructor(
    @InjectRepository(OTP) private _otpRepository: Repository<OTP>,
    private _configService: ConfigService,
  ) {}

  async findOne(filters: Partial<OTP>): Promise<OTP | null> {
    return this._otpRepository.findOne({ where: filters });
  }

  async generateOTP({ email }: GenerateOTPDto): Promise<void> {
    const EXISTING_OTP = await this.findOne({ email });

    if (EXISTING_OTP) {
      this._otpRepository.remove(EXISTING_OTP);
    }

    const TOKEN = await this._generateToken();
    const OTP = this._otpRepository.create({
      email,
      otp: TOKEN,
      expiresAt: new Date().toISOString(),
    });

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

  private async _generateToken(): Promise<string> {
    const SECRET = this._configService.get('OTP_SECRET');
    const TOKEN = speakeasy.totp({
      secret: SECRET,
      digits: 6,
      encoding: 'hex',
    });

    return await bcrypt.hash(TOKEN, 10);
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
