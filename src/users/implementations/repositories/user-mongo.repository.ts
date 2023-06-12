import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument } from 'mongoose';
import { UserRepository } from 'src/users/interfaces/user.repository';
import { UserDocument, UserModel } from '../schemas/users.schema';
import { Role, User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}
  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user as User;
  }

  async findAll() {
    const users = await this.userModel.find().lean();
    return users.map((user) => this.mapToUser(user));
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = await new this.userModel(createUserDto).save();
    return this.mapToUser(userCreated);
  }
  async removeRoles(email: string, role: Role): Promise<User> {
    const newRoles = [];
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      //if no roles then do nothing
      if (!user.roles) {
        throw new Error('user do have any course');
      }
      for (const currentRole of user.roles) {
        const today = new Date();
        //if is the target role dont keep
        if (currentRole.role === role.role) {
          //if is not target and is not expired keep
        } else if (currentRole.expiration >= today) {
          newRoles.push(currentRole);
        }
      }
      if (newRoles.length <= 1) {
        user.roles = null;
        user.markModified('roles');
        await user.save();
        throw new Error('user do have any course');
      } else if (newRoles.length > 1) {
        user.roles = newRoles as [Role];
        user.markModified('roles');
        await user.save();
        throw new Error('user do have this course');
      } else {
        user.roles = newRoles as [Role];
        user.markModified('roles');
        const updatedUser = await user.save();
        return this.mapToUser(updatedUser);
      }
    }
  }
  async addRoles(email: string, role: Role): Promise<User> {
    const newRoles = [];
    const user = await this.userModel.findOne({ email: email });
    let premium = false;
    if (user && user.roles) {
      for (const currentRole of user.roles) {
        const today = new Date();
        //if already have the role and its not expired return
        if (currentRole.role === role.role && currentRole.expiration >= today) {
          throw new Error('user already have this course');
        }
        //if already have the role and its expired dont keep
        if (currentRole.role === role.role && currentRole.expiration < today) {
          //if is not the role and is not expired keep
        } else if (currentRole.expiration >= today) {
          //if premium raise expiration time to latest one
          if (currentRole.role === 'PREMIUM_USER') {
            premium = true;
            newRoles.push({
              role: currentRole.role,
              expiration: role.expiration,
            } as Role);
            //if not premium keep original expiration
          } else {
            newRoles.push(currentRole);
          }
        }
      }
      //if all roles and premium expired/removed
      if (newRoles.length === 0) {
        user.roles = newRoles as [Role];
        user.roles.push({
          role: 'PREMIUM_USER',
          expiration: role.expiration,
        });
        user.roles.push(role);
        user.markModified('roles');
        const updatedUser = await user.save();
        return this.mapToUser(updatedUser);
      }
      //if already premium
      if (newRoles.length >= 1 && premium) {
        user.roles = newRoles as [Role];
        user.roles.push(role);
        user.markModified('roles');
        const updatedUser = await user.save();
        return this.mapToUser(updatedUser);
      }
    } else if (!user) {
      const newUser = await this.createUser({
        email: email,
        roles: [role, { role: 'PREMIUM_USER', expiration: role.expiration }],
      });
      console.log(JSON.stringify(newUser));
      console.log(
        `***this is mock of a mail sent to user: Hello here is your temporary password:${newUser.password} use your email:${newUser.email} and this temporary password to first authentication, be sure change this password as soon as possible`,
      );
      return this.mapToUser(newUser);
    } else if (!user.roles) {
      (user.roles = [{ role: 'PREMIUM_USER', expiration: role.expiration }] as [
        Role,
      ]),
        user.roles.push(role);
      user.markModified('roles');
      const updatedUser = await user.save();
      return this.mapToUser(updatedUser);
    }
  }

  private mapToUser(rawUser: LeanDocument<UserDocument>): User {
    const user = new User();

    user.id = rawUser.id;
    user.email = rawUser.email;
    user.roles = rawUser.roles;
    user.password = rawUser.password;
    user.createdAt = rawUser.createdAt || new Date();
    user.updatedAt = rawUser.updatedAt || new Date();

    return user;
  }
}
