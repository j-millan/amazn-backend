export interface OTPServiceInterface {
  generateOTP(email: string): Promise<void>;
  validateOTP(otp: string, email: string): Promise<boolean>;
}
