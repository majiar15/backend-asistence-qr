
import { getDateUTC } from "@common/utils/getDateUTC";
import { AssistanceDataSource } from "@datasource/assistance.datasource";
import {ForbiddenException} from '@nestjs/common';
import { Types,Document } from "mongoose";


export class TakeAssistanceStudentUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }

    constructor(private AssistanceDataSource: AssistanceDataSource){}

    async main(course_id: string, student_id: string){
        try {
            const date = getDateUTC();
            await this.validateAsistence(course_id, student_id, date)
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
    async takeAsistence(course_id: string, student_id: string, date: Date){
        const data= await this.AssistanceDataSource.takeAssistance(course_id, student_id, date)
        this.response= {status:true,data}
    }

}