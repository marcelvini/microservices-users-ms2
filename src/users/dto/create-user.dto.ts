import { Role } from '../entities/user.entity';

type CreateUserDto = {
  email: string;
  roles: Role[];
};
export { CreateUserDto };
