import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { throwHttpException } from 'src/core';
import { OTPServiceInterface } from './otp.service.interface';
import { OTP } from '../../entities';
import { GenerateOTPDto, VerifyOTPDto } from 'src/auth/dto';

@Injectable()
export class OTPService implements OTPServiceInterface {
  constructor(@InjectRepository(OTP) private _otpRepository: Repository<OTP>) {}

  async generateOTP({ email }: GenerateOTPDto): Promise<void> {
    const PASSWORD = '123456';
    const OTP = this._otpRepository.create({
      email,
      otp: PASSWORD,
      expiresAt: new Date().toISOString(),
    });

    await this._otpRepository.save(OTP);
  }

  async verifyOTP({ otp, email }: VerifyOTPDto): Promise<void> {
    const OTP = this._otpRepository.find({ where: { otp, email } });

    if (!OTP) {
      throwHttpException(
        HttpStatus.UNAUTHORIZED,
        'the OTP is invalid or has expired',
      );
    }
  }
}
