import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ required: true })
  week_day: string;

  @Prop({ required: true })
  start_hour: string;

  @Prop({ required: true })
  end_hour: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Course', required: true })
  course_id: string; // Referencia al ID del curso
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
