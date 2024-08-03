import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';



@Schema({ _id: false })
export class StudentEnrollment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true })
  student_id: Types.ObjectId;

  @Prop({ required: true })
  payment: boolean;
}

export const StudentEnrollmentSchema = SchemaFactory.createForClass(StudentEnrollment);

@Schema({versionKey:false})
export class Courses extends Document {


    @Prop({ required: true })
    name:string;

    @Prop({ required:true, type: mongoose.Schema.Types.ObjectId,ref: 'Users',})
    teacher_id :Types.ObjectId;

    @Prop()
    date_start:Date;

    @Prop()
    date_end:Date;

    @Prop()
    intensity:number;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref: 'AcademicProgram'}]})
    academic_programs:Types.ObjectId[];

    @Prop()
    description:string;

    @Prop({ type: [StudentEnrollmentSchema], default: [] })
    students:StudentEnrollment[];

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Schedule'}]})
    schedules:Types.ObjectId[];

    @Prop({ default: false})
    delete:boolean;

}
export type CoursesDocument = Courses & Document;

export const CoursesSchema = SchemaFactory.createForClass(Courses);

