import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ collection: 'assistance_teacher', versionKey: false })
export class AssistanceTeacher {

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  bitacora: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true })
  course_id: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  teacher_id: Types.ObjectId;

  @Prop({ required: true })
  hour_start: string;

  @Prop({ required: true })
  isCancel: boolean;

  @Prop({ required: false })
  secret: string;
}

export type AssistanceTeacherDocument = AssistanceTeacher & Document;

export const AssistanceTeacherSchema = SchemaFactory.createForClass(AssistanceTeacher);
