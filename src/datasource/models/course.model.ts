import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema({versionKey:false})
export class Courses extends Document {


    @Prop({ required: true })
    name:string;

    @Prop({ required:true, type: mongoose.Schema.Types.ObjectId,ref: 'Teacher',})
    teacher_id :string;

    @Prop()
    date_start:string;

    @Prop()
    date_end:string;

    @Prop()
    description:string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Student'}]})
    students_ids:string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Schedule'}]})
    schedules_ids:string;

    @Prop()
    delete:boolean;

}
export type CoursesDocument = Courses & Document;

export const CoursesSchema = SchemaFactory.createForClass(Courses);