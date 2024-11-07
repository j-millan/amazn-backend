import { User } from 'src/users/entities';
import { CreateUserDto } from './dto';

export interface UserServiceInterface {
  find(id: string): Promise<User>;
  create(data: CreateUserDto): Promise<User>;
}
