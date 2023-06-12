import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './interfaces/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }
  async addRoles(email: string, role: Role) {
    return await this.userRepository.addRoles(email, role);
  }
  async removeRoles(email: string, role: Role) {
    return await this.userRepository.removeRoles(email, role);
  }
  async findAll() {
    return this.userRepository.findAll();
  }
}
