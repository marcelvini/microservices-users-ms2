import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Role {
  @Prop()
  role: string;
  @Prop()
  expiration: Date;
}

@Schema({ _id: true })
class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ type: MongooseSchema.Types.Array })
  roles: [Role];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<UserDocument>;
