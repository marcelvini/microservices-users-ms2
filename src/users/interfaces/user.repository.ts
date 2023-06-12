import { CreateUserDto } from '../dto/create-user.dto';
import { Role, User } from '../entities/user.entity';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository {
  findAll(): Promise<User[]>;
  createUser(createUserDto: CreateUserDto): Promise<User>;
  addRoles(email: string, role: Role): Promise<User>;
  removeRoles(email: string, role: Role): Promise<User>;
}
