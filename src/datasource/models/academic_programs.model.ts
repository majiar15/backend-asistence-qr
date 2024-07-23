

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ collection: 'academic_programs',versionKey:false })
export class AcademicProgram {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  faculty: string;
}

export type AcademicProgramDocument = AcademicProgram & Document;

export const AcademicProgramSchema = SchemaFactory.createForClass(AcademicProgram);
