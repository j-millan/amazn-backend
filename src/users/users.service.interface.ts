import { User } from 'src/users/entities';

export interface UserServiceInterface {
  find(id: string): Promise<User>;
}
