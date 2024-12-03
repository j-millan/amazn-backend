import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Interval } from '@nestjs/schedule';

import { throwHttpException } from 'src/core';
import { OTPServiceInterface } from './otp.service.interface';
import { GenerateOTPDto, VerifyOTPDto } from 'src/auth/dto';
import { OTP } from '../../entities';

@Injectable()
export class OTPService implements OTPServiceInterface {
  constructor(@InjectRepository(OTP) private _otpRepository: Repository<OTP>) {}

  async findOne(filters: Partial<OTP>): Promise<OTP | null> {
    return this._otpRepository.findOne({ where: filters });
  }

  async generateOTP({ email }: GenerateOTPDto): Promise<void> {
    const EXISTING_OTP = await this.findOne({ email });

    if (EXISTING_OTP) {
      this._otpRepository.remove(EXISTING_OTP);
    }

    const PASSWORD = this._createPassword();
    const OTP = this._otpRepository.create({
      email,
      otp: PASSWORD,
      expiresAt: new Date().toISOString(),
    });

    await this._otpRepository.save(OTP);
  }

  async verifyOTP({ otp, email }: VerifyOTPDto): Promise<void> {
    const OTP = await this.findOne({ email, otp });

    if (!OTP || OTP.expiresAt < new Date()) {
      throwHttpException(
        HttpStatus.UNAUTHORIZED,
        'the OTP is invalid or has expired',
      );
    }

    this._otpRepository.remove(OTP);
  }

  private _createPassword(): string {
    const DIGITS = '0123456789';
    let password = '';

    for (let i = 0; i < 6; i++) {
      password += DIGITS[Math.floor(Math.random() * 10)];
    }

    return password;
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
