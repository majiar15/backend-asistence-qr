import { InjectModel } from "@nestjs/mongoose";
import { Assistance, AssistanceDocument } from "./models/assistance.model";
import { Model } from "mongoose";

export class AssistanceDataSource {
    constructor(
        @InjectModel(Assistance.name) 
        private readonly Assistance: Model<AssistanceDocument>,
    ) { }


    async takeAssistance(course_id: string, student_id: string, date: Date, isLateArrive: boolean = false) {
        return this.Assistance.create({
            student_id,
            date,
            course_id,
            late: isLateArrive
        })
    }
    async getAssistance(course_id: string, student_id: string, date: Date) {
        return this.Assistance.findOne({
            student_id,
            date,
            course_id
        })
    }
    async getAssistanceByCourse(course_id: string, date: Date) {
        return this.Assistance.find({
            date,
            course_id
        })
    }
    async getLastAssistance(course_id: string) {
        return this.Assistance.findOne({ course_id})
        .sort({ date: -1 })
        .exec();
    }
    async getAssistanceByDate(date: Date,course_id: string) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        endOfDay.setUTCHours(23, 59, 59, 999);
        return this.Assistance.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            course_id
        })
        .exec();
    }
}