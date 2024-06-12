import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";


@Schema({versionKey:false})
export class Student extends Document {
    
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
    academic_program:Types.ObjectId;

    @Prop({ required: true,unique:true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({default:false,select: false})
    delete: boolean;
}

export type StudentDocument = Student & Document;

export const StudentsSchema = SchemaFactory.createForClass(Student);