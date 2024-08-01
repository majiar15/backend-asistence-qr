

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';


@Schema({ collection: 'device', versionKey: false })
export class Device {
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    display: string;

    @Prop({ required: true })
    device_id: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required:true,type: mongoose.Schema.Types.ObjectId,ref:'Student'})
    student_id:Types.ObjectId;

    @Prop()
    date: Date;

}

export type DeviceDocument = Device & Document;

export const DeviceSchema = SchemaFactory.createForClass(Device);
