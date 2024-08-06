import { getDateUTC } from "@common/utils/getDateUTC";
import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses } from "@datasource/models/course.model";
import {  ForbiddenException } from '@nestjs/common';
import { Types, Document } from "mongoose";

export class CreateAssistanceTeacherUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }
    course: Courses;
    isvalidAssistance = false;

    constructor(
        private AssistanceTeacherDataSource: AssistanceTeacherDataSource,
        private CourseDataSource: CoursesDataSource
    ) {}

    async main(courseId: string, bitacora: string, secret: string, isCancel: boolean = false, teacher_id: string) {
        try {
            const date = getDateUTC();
            await this.validateAssistance(courseId, teacher_id, date);
            await this.getCourse(courseId);
            await this.takeAssistance(courseId,teacher_id, bitacora, isCancel, secret, date);
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    async validateAssistance(courseId: string, teacher_id: string, date: Date,) {
        const assist = await this.AssistanceTeacherDataSource.getAssistance(courseId,teacher_id, date);
        console.log("assist", assist);
        if (assist) {
            throw new ForbiddenException("Ya se ha registrado la asistencia para este curso en esta fecha");
        }
    }

    async getCourse(courseId: string) {
        this.course = await this.CourseDataSource.getCourseById(courseId);
        if (!this.course) {
            throw new ForbiddenException("Curso no encontrado");
        }
    }

    async takeAssistance(courseId: string,teacherId: string, bitacora: string,isCancel: boolean, secret: string, date: Date) {
        const data = await this.AssistanceTeacherDataSource.takeAssistance(courseId,teacherId, bitacora, secret, date, isCancel);
        this.response = { status: true, data };
    }

}
