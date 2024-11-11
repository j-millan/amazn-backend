import { SignInDto, SignInResponseDto, SignUpDto } from 'src/auth/dto';

export interface AuthServiceInterface {
  signUp(data: SignUpDto): Promise<SignInResponseDto>;
  signIn(data: SignInDto): Promise<SignInResponseDto>;
}
