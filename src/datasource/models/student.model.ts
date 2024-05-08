import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({versionKey:false})
export class Student {
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    surnames: string;
  
    @Prop({ required: true,unique:true })
    dni: number;

    @Prop()
    phone: number;

    @Prop()
    role: string;

    @Prop({  required: true, type: mongoose.Schema.Types.ObjectId, ref: 'AcademicProgram', })
    academic_program_id:string;

    @Prop({ required: true,unique:true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export type StudentDocument = Student & Document;

export const StudentsSchema = SchemaFactory.createForClass(Student);