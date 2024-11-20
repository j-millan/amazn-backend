import { User } from 'src/users/entities';
import { SignUpDto } from '../auth/dto';
import { UserFiltersInterface } from './interfaces';

export interface UsersServiceInterface {
  find(filters: UserFiltersInterface): Promise<User>;
  findByEmailOrPhoneNumber(credential: string): Promise<User>;
  create(data: SignUpDto): Promise<User>;
}
