import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { throwHttpException } from 'src/core';
import { OTPServiceInterface } from './otp.service.interface';
import { OTP } from '../../entities';

@Injectable()
export class OTPService implements OTPServiceInterface {
  constructor(@InjectRepository(OTP) private _otpRepository: Repository<OTP>) {}

  async generateOTP(email: string): Promise<void> {
    const OTP = this._otpRepository.create({
      email,
      otp: '123456',
    });

    await this._otpRepository.save(OTP);
  }

  async validateOTP(otp: string, email: string): Promise<boolean> {
    const OTP = this._otpRepository.find({ where: { otp, email } });

    if (!OTP) {
      throwHttpException(
        HttpStatus.UNAUTHORIZED,
        'the OTP is invalid or has expired',
      );
    } else {
      return true;
    }
  }
}
