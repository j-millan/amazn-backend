import { User } from 'src/users/entities';
import { SignUpDto } from '../auth/dto';

export interface UsersServiceInterface {
  find(id: string): Promise<User>;
  create(data: SignUpDto): Promise<User>;
}
