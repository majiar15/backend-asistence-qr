

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';


@Schema({versionKey:false })
export class ContactSupport {

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Student'})
  student:Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  message: string;
}

export type ContactSupportDocument = ContactSupport & Document;

export const ContactSupportSchema = SchemaFactory.createForClass(ContactSupport);
