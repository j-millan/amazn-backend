import { User } from 'src/users/entities';
import { SignupDto } from '../auth/dto';

export interface UsersServiceInterface {
  find(id: string): Promise<User>;
  create(data: SignupDto): Promise<User>;
}
