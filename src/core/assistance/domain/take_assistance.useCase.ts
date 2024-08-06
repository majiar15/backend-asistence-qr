
import { getDateUTC } from "@common/utils/getDateUTC";
import { AssistanceDataSource } from "@datasource/assistance.datasource";
import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses } from "@datasource/models/course.model";
import {BadRequestException, ForbiddenException} from '@nestjs/common';
import { Types,Document } from "mongoose";


export class TakeAssistanceUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }
    course: Courses;
    isLateArrive = false;
    isvalidAssistance = false;
    constructor(
        private AssistanceDataSource: AssistanceDataSource,
        private CourseDataSource: CoursesDataSource
    ){}

    async main(course_id: string, student_id: string){
        try {
            const date = getDateUTC();
            console.log("date", date);
            await this.getCourse(course_id)
            await this.validateAsistence(course_id, student_id, date)
            await this.validateLateArrive()
            await this.takeAsistence(course_id, student_id, date);
            return this.response; 
        } catch (error) {
            throw error;
        }

    }

    async validateAsistence(course_id: string, student_id: string, date: Date){
        const assist = await this.AssistanceDataSource.getAssistance(course_id, student_id, date);
        if (assist) {
            throw new ForbiddenException("Estudiante ya asistió");
        }
    }
    async getCourse(course_id: string){
        this.course = await this.CourseDataSource.getCourseByIdIncludeStudents(course_id);
        if (!this.course) {
            throw new ForbiddenException("Curso no encontrado");
        }
    }
    async validateLateArrive() {
        if (this.course) {
            console.log("assist", this.course);
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
                const isWithin15MinutesAfterStart = currentTimeMinutes > scheduleStartMinutes + 15;
                console.log("============ ---------- ================");
                console.log("=========== currentTimeMinutes ==========", currentTimeMinutes);
                console.log("=========== scheduleStartMinutes ==========", scheduleStartMinutes);
                console.log("=========== schedule.week_day ==========", schedule.week_day);
                console.log("=========== currentDay ==========", currentDay);
                console.log("=========== current day ==========", schedule.week_day === currentDay);
                console.log("=========== hour_start ==========", isAfterStart);
                console.log("=========== hour_end ==========", isBeforeEnd);
                console.log("=========== within 15 minutes after start ==========", isWithin15MinutesAfterStart);

                if (schedule.week_day === currentDay && isAfterStart && isBeforeEnd) {
                    // ya se valido que este en clases
                    this.isvalidAssistance = true;
                    if (isWithin15MinutesAfterStart) {
                        // se valida la llegada tarde
                        this.isLateArrive = true;
                    }
                    return true;
                }
                return false;
            });

            if (!isActive) {
                throw new ForbiddenException("El curso no está activo");
            }

            if (!isInClass) {
                throw new ForbiddenException("El estudiante no está en clase");
            }
            if(!this.isvalidAssistance){
                throw new BadRequestException("Asistencia Invalida");
            }
        }
    }

    async takeAsistence(course_id: string, student_id: string, date: Date){
        const data= await this.AssistanceDataSource.takeAssistance(course_id, student_id, date, this.isLateArrive)
        this.response= {status:true,data}
    }

}