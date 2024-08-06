import { getDateUTC } from "@common/utils/getDateUTC";
import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import {  NotFoundException } from '@nestjs/common';
import { Types, Document } from "mongoose";

export class GetTodayAssistanceTeacherUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }

    constructor(
        private AssistanceTeacherDataSource: AssistanceTeacherDataSource
    ) {}

    async main(courseId: string, teacher_id: string) {
        try {
            const date = getDateUTC();
            await this.getAssistanceTeacher(courseId, teacher_id, date);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async getAssistanceTeacher(courseId: string, teacher_id: string, date: Date,) {
        const assist = await this.AssistanceTeacherDataSource.getAssistance(courseId,teacher_id, date);
        console.log("assist", assist);
        if (!assist) {
            throw new NotFoundException("No hay Asistencia el dia de hoy");
        }
        this.response = {
            status: true,
            data: assist
        };

    }

}
