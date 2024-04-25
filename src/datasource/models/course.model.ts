import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Courses extends Document {


    @Prop({ required: true })
    name:string;

    @Prop()
    credits:number;

    @Prop({ type: mongoose.Schema.Types.ObjectId,required:true })
    teacher_id :string;

    @Prop()
    start:string;

    @Prop()
    end:string;

    @Prop()
    description:string;

    @Prop()
    room:string;

    @Prop()
    status:boolean;

}
export type CoursesDocument = Courses & Document;

export const CoursesSchema = SchemaFactory.createForClass(Courses);