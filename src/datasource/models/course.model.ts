import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CoursesDocument = HydratedDocument<Courses>;

@Schema()
export class Courses {


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

export const CoursesSchema = SchemaFactory.createForClass(Courses);