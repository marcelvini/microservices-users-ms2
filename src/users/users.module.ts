import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserSchema } from './implementations/schemas/users.schema';
import { UsersService } from './users.service';
import { USER_REPOSITORY } from './interfaces/user.repository';
import { UserMongoRepository } from './implementations/repositories/user-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UserMongoRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
