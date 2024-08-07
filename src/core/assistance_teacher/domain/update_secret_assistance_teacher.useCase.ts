import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { NotFoundException } from '@nestjs/common';
import { Types, Document } from "mongoose";

export class UpdateSecretAssistanceTeacherUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }
    course;
    constructor(
        private AssistanceTeacherDataSource: AssistanceTeacherDataSource
    ) {}

    
    async main(bitacoraId: string, secret: string, teacher_id: string) {
        try {
            await this.getCourseByBitacora(bitacoraId);
            await this.updateBitacora(bitacoraId, secret, teacher_id);
            return this.response;
        } catch (error) {
            throw error;
        }
    }


    async getCourseByBitacora(bitacoraId: string) {
        const bitacora = await this.AssistanceTeacherDataSource.getCourseByBitacora(bitacoraId);
        if (!bitacora) {
            throw new NotFoundException('Bitacora no encontrada');
        }
        this.course = bitacora.course_id;

    }



    isCourseActiveAndInClass() {
        const now = new Date();
        const startDate = new Date(this.course.date_start);
        const endDate = new Date(this.course.date_end);
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

        const isActive = now >= startDate && now <= endDate;
        const isInClass = this.course.schedules.some(schedule => {
            console.log("schedule.week_day", schedule.week_day);
            console.log("currentDay", currentDay);
            console.log("current day", schedule.week_day === currentDay);
            console.log("hour_start", currentTime >= schedule.hour_start );
            console.log("hour_end", currentTime <= schedule.hour_end);
            return schedule.week_day === currentDay &&
                currentTime >= schedule.hour_start &&
                currentTime <= schedule.hour_end;
        });
        console.log("isInClass",isInClass);
        console.log("isActive",isActive);
        return isActive && isInClass;
    }

    async updateBitacora(bitacoraId: string, secret: string,teacher_id:string) {
        const bitacora = await this.AssistanceTeacherDataSource.updateSecret(bitacoraId,secret, teacher_id);
        if (!bitacora) {
            throw new NotFoundException('Bitacora no encontrada');
        }
        const inClass = await this.isCourseActiveAndInClass();
        this.response = {
            status: true,
            data: {
                _id :bitacora._id,
                date :bitacora.date,
                bitacora :bitacora.bitacora,
                course_id :bitacora.course_id,
                teacher_id :bitacora.teacher_id,
                hour_start :bitacora.hour_start,
                isCancel :bitacora.isCancel,
                secret :bitacora.secret,
                inClass
            }
        };

    }
}
