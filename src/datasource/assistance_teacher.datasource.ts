import { InjectModel } from "@nestjs/mongoose";
import { AssistanceTeacher, AssistanceTeacherDocument } from "./models/assistance_teacher.model";
import { Model } from "mongoose";

export class AssistanceTeacherDataSource {
    constructor(
        @InjectModel(AssistanceTeacher.name) 
        private readonly assistanceTeacher: Model<AssistanceTeacherDocument>,
    ) { }


    async takeAssistance(course_id: string, teacher_id: string, bitacora:string, secret: string , date: Date, isCancel: boolean = false ) {
        const fecha = new Date();
        const hour = fecha.getHours().toString().padStart(2, '0');
        const minutes = fecha.getMinutes().toString().padStart(2, '0');
        return this.assistanceTeacher.create({
            teacher_id,
            date,
            course_id,
            bitacora,
            secret,
            hour_start: `${hour}:${minutes}`,
            isCancel
        })
    }
    async getAssistance(course_id: string, teacher_id: string, date: Date) {
        console.log("course_id",course_id);
        return this.assistanceTeacher.findOne({
            teacher_id,
            date,
            course_id
        })
    }
    async getAssistanceByDate(course_id: string, date: Date) {
        return this.assistanceTeacher.findOne({
            date,
            course_id
        })
    }
    async getCourseByBitacora(_id: string) {
        return this.assistanceTeacher.findById(
            _id
        )
        .populate('course_id')
        .populate({
            path: 'course_id',
            populate: {
              path: 'schedules',
              model: 'Schedule'
            }
          });
    }
    async updateSecret(bitacoraId: string, secret: string, teacher_id: string) {
        return this.assistanceTeacher.findOneAndUpdate(
            {
                _id: bitacoraId,
                teacher_id: teacher_id
            },
            {
                secret
            },
            {
                new: true
            }
        )
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

}