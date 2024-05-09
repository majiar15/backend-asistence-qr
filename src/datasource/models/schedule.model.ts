import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema({versionKey:false})
export class Schedule {
  @Prop({ required: true })
  week_day: string;

  @Prop({ required: true })
  hour_start: string;

  @Prop({ required: true })
  hour_end: string;

  @Prop()
  room:string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  course_id: string; // Referencia al ID del curso

  @Prop({default:false})
  delete: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
