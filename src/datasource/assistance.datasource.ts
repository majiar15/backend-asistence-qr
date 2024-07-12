import { InjectModel } from "@nestjs/mongoose";
import { Assistance, AssistanceDocument } from "./models/assistance.model";
import { Model } from "mongoose";

export class AssistanceDataSource {
    constructor(
        @InjectModel(Assistance.name) 
        private readonly Assistance: Model<AssistanceDocument>,
    ) { }


    async takeAssistance(course_id: string, student_id: string, date: string) {
        return this.Assistance.create({
            student_id,
            date,
            course_id
        })
    }
}