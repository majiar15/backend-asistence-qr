import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema({versionKey:false})
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surnames: string;
  
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

  @Prop({default:false,select: false})
  delete: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);


