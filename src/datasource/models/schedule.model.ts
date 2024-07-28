import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';


@Schema({versionKey:false})
export class Schedule {
  @Prop({ required: true })
  week_day: string;

  @Prop({ required: true })
  hour_start: string;

  @Prop({ required: true })
  hour_end: string;

  @Prop({ required: true })
  hour_milliseconds: number;

  @Prop()
  room:string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  course_id: Types.ObjectId; // Referencia al ID del curso

  @Prop({default:false,select: false})
  delete: boolean;
}

export type ScheduleDocument = Schedule & Document;

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
