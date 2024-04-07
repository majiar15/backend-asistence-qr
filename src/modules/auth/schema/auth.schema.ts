import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true,unique:true })
  email: string;
  @Prop({ required: true,unique:true })
  dni: number;
  @Prop()
  phone: number;
  @Prop()
  role: string;
  @Prop({ required: true })
  password: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users);