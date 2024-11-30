import { GenerateOTPDto, VerifyOTPDto } from 'src/auth/dto';

export interface OTPServiceInterface {
  generateOTP(data: GenerateOTPDto): Promise<void>;
  verifyOTP(data: VerifyOTPDto): Promise<void>;
}
