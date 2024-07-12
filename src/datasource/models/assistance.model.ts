

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';


@Schema({ collection: 'assistance',versionKey:false })
export class Assistance {

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Student'})
  student_id:Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId,ref:'Courses'})
  course_id:Types.ObjectId;

  @Prop({ required: true })
  date: string;
}

export type AssistanceDocument = Assistance & Document;

export const AssistanceSchema = SchemaFactory.createForClass(Assistance);
