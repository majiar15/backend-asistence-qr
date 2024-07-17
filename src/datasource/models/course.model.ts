import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';


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
    description:string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Student'}]})
    students:Types.ObjectId[];

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Schedule'}]})
    schedules:Types.ObjectId[];

    @Prop({ default: false,select: false })
    delete:boolean;

}
export type CoursesDocument = Courses & Document;

export const CoursesSchema = SchemaFactory.createForClass(Courses);