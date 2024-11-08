import { SignUpDto } from 'src/auth/dto';
import { User } from 'src/users/entities';

export interface AuthServiceInterface {
  signUp(data: SignUpDto): Promise<User>;
  signIn(): Promise<void>;
}
