import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({versionKey:false})
export class Secret extends Document {

    @Prop({ required: true })
    name:string;

    @Prop({ required: true })
    key:string;
}
export type secretDocument = Secret & Document;

export const SecretSchema = SchemaFactory.createForClass(Secret);