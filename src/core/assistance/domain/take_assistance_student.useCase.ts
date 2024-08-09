
import { getDateUTC, getDateUTCComplete } from "@common/utils/getDateUTC";
import { AssistanceDataSource } from "@datasource/assistance.datasource";
import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { DeviceDataSource } from "@datasource/device.datasource";
import { AssistanceTeacher } from "@datasource/models/assistance_teacher.model";
import { Courses } from "@datasource/models/course.model";
import {BadRequestException, ForbiddenException} from '@nestjs/common';
import { Types,Document } from "mongoose";


export class TakeAssistanceStudentUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }
    course: Courses;
    isLateArrive = false;
    isvalidAssistance = false;
    teacherAsistance: AssistanceTeacher;


    constructor(
        private AssistanceDataSource: AssistanceDataSource,
        private deviceDatasource: DeviceDataSource,
        private AssistanceTeacherSource: AssistanceTeacherDataSource
    ){}

    async main(secret: string, student_id: string){
        try {
            const date = getDateUTC();
            await this.getAsistanceTeacher(secret);
            await this.validateAsistence(student_id, date)

            this.validateLateArrive();
            await this.takeAsistence(student_id, date);
            await this.savehHourAsistance(student_id);
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async validateAsistence( student_id: string, date: Date){
        const assist = await this.AssistanceDataSource.getAssistance(this.course._id, student_id, date);
        if (assist) {
            throw new ForbiddenException("Estudiante ya asistió");
        }
    }
    async getAsistanceTeacher(secret: string){
        this.teacherAsistance = await this.AssistanceTeacherSource.getAssistanceBySecret(secret);
        if (!this.teacherAsistance) {
            throw new ForbiddenException("El profesor aun no ha iniciado la clase");
        }
        //@ts-ignore
        this.course = this.teacherAsistance.course_id;

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
                const teacherInitClass = toMinutes(this.teacherAsistance.hour_start);
                const scheduleEndMinutes = toMinutes(schedule.hour_end);
                const currentTimeMinutes = toMinutes(currentTime);

                const isAfterStart = currentTimeMinutes >= scheduleStartMinutes;
                const isBeforeEnd = currentTimeMinutes <= scheduleEndMinutes;
                const isWithin15MinutesAfterStart = currentTimeMinutes > teacherInitClass + 15;
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
                    console.log("isWithin15MinutesAfterStart", isWithin15MinutesAfterStart);
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
    async takeAsistence(student_id: string, date: Date){
        console.log("this.isLateArrive",this.isLateArrive);
        const data= await this.AssistanceDataSource.takeAssistance(this.course._id, student_id, date, this.isLateArrive)
        this.response= {status:true,data}
    }
    async savehHourAsistance(student_id: string){
        const dateNow = getDateUTCComplete();
        console.log("this.isLateArrive",this.isLateArrive);
        await this.deviceDatasource.updateDevice({
            student_id: student_id
        },{
            date: dateNow
        });
    }

}