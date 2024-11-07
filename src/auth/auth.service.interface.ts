import { SignupDto } from 'src/auth/dto';
import { User } from 'src/users/entities';

export interface AuthServiceInterface {
  signUp(data: SignupDto): Promise<User>;
  signIn(): Promise<void>;
}
