import { InjectModel } from "@nestjs/mongoose";
import { AssistanceTeacher, AssistanceTeacherDocument } from "./models/assistance_teacher.model";
import { Model } from "mongoose";

export class AssistanceTeacherDataSource {
    constructor(
        @InjectModel(AssistanceTeacher.name) 
        private readonly assistanceTeacher: Model<AssistanceTeacherDocument>,
    ) { }


    async takeAssistance(course_id: string, teacher_id: string, bitacora:string, secret: string , date: Date) {
        const fecha = new Date();
        const hour = fecha.getHours().toString().padStart(2, '0');
        const minutes = fecha.getMinutes().toString().padStart(2, '0');
        return this.assistanceTeacher.create({
            teacher_id,
            date,
            course_id,
            bitacora,
            secret,
            hour_start: `${hour}:${minutes}`
        })
    }
    async getAssistance(course_id: string, teacher_id: string, date: Date) {
        return this.assistanceTeacher.findOne({
            teacher_id,
            date,
            course_id
        })
    }
    async getAssistanceByCourse(course_id: string, date: Date) {
        return this.assistanceTeacher.find({
            date,
            course_id
        })
    }
    async getLastAssistance(course_id: string) {
        return this.assistanceTeacher.findOne({ course_id})
        .sort({ date: -1 })
        .exec();
    }
    async getAssistanceByDate(date: Date,course_id: string) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        endOfDay.setUTCHours(23, 59, 59, 999);
        return this.assistanceTeacher.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            course_id
        })
        .exec();
    }
}