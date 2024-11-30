import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { throwHttpException } from 'src/core';
import { OTPServiceInterface } from './otp.service.interface';
import { GenerateOTPDto, VerifyOTPDto } from 'src/auth/dto';
import { OTP } from '../../entities';

@Injectable()
export class OTPService implements OTPServiceInterface {
  constructor(@InjectRepository(OTP) private _otpRepository: Repository<OTP>) {}

  async generateOTP({ email }: GenerateOTPDto): Promise<void> {
    const PASSWORD = this._createPassword();
    const OTP = this._otpRepository.create({
      email,
      otp: PASSWORD,
      expiresAt: new Date().toISOString(),
    });

    await this._otpRepository.save(OTP);
  }

  async verifyOTP({ otp, email }: VerifyOTPDto): Promise<void> {
    const OTP = await this._otpRepository.findOne({ where: { otp, email } });

    if (!OTP || OTP.expiresAt < new Date()) {
      throwHttpException(
        HttpStatus.UNAUTHORIZED,
        'the OTP is invalid or has expired',
      );
    }
  }

  private _createPassword(): string {
    const DIGITS = '0123456789';
    let password = '';

    for (let i = 0; i < 6; i++) {
      password += DIGITS[Math.floor(Math.random() * 10)];
    }

    return password;
  }
}
