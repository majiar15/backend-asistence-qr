import { getDateUTC } from "@common/utils/getDateUTC";
import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses } from "@datasource/models/course.model";
import {   NotFoundException } from '@nestjs/common';
import { Types, Document } from "mongoose";

export class GetTodayAssistanceTeacherUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }
    course: Courses;
    constructor(
        private AssistanceTeacherDataSource: AssistanceTeacherDataSource,
        private CourseDataSource: CoursesDataSource
    ) {}

    async main(courseId: string, teacher_id: string) {
        try {
            const date = getDateUTC();

            await this.getCourse(courseId);
            await this.validateCourse();
            await this.getAssistanceTeacher(courseId, teacher_id, date);
            return this.response;
        } catch (error) {
            throw error;
        }
    }


    async getCourse(courseId: string) {
        try {
            this.course = await this.CourseDataSource.getCourseById(courseId);
            if (!this.course) {
                throw new NotFoundException("Curso no encontrado");
            }
        } catch (error) {
            throw new NotFoundException("Curso no encontrado");
        }
    }

    async validateCourse() {
        if (this.course) {
            const now = new Date();
            const startDate = new Date(this.course.date_start);
            const endDate = new Date(this.course.date_end);
            const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
            const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

            // Convertir horas y minutos a minutos desde medianoche
            const toMinutes = (time: string) => {
                const [hours, minutes] = time.split(':').map(Number);
                return hours * 60 + minutes;
            };

            const isActive = now >= startDate && now <= endDate;

            const isInClass = this.course.schedules.some((schedule: any) => {
                const scheduleStartMinutes = toMinutes(schedule.hour_start);
                const scheduleEndMinutes = toMinutes(schedule.hour_end);
                const currentTimeMinutes = toMinutes(currentTime);

                const isAfterStart = currentTimeMinutes >= scheduleStartMinutes;
                const isBeforeEnd = currentTimeMinutes <= scheduleEndMinutes;
                console.log("============ ---------- ================");
                console.log("=========== currentTimeMinutes ==========", currentTimeMinutes);
                console.log("=========== scheduleStartMinutes ==========", scheduleStartMinutes);
                console.log("=========== schedule.week_day ==========", schedule.week_day);
                console.log("=========== currentDay ==========", currentDay);
                console.log("=========== current day ==========", schedule.week_day === currentDay);
                console.log("=========== hour_start ==========", isAfterStart);
                console.log("=========== hour_end ==========", isBeforeEnd);

                if (schedule.week_day === currentDay && isAfterStart && isBeforeEnd) {
                    return true;
                }
                return false;
            });

            if (!isActive) {
                throw new NotFoundException("El curso no está activo");
            }

            if (!isInClass) {
                throw new NotFoundException("La clase no esta ne curso");
            }
        }
    }
    async getAssistanceTeacher(courseId: string, teacher_id: string, date: Date,) {
        const assist = await this.AssistanceTeacherDataSource.getAssistance(courseId,teacher_id, date);
        if (!assist) {
            return this.response = {
                status: false,
                data: null
            };
        }
        this.response = {
            status: true,
            data: assist
        };

    }

}
