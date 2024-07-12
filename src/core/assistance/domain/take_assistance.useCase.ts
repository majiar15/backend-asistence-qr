
import { AssistanceDataSource } from "@datasource/assistance.datasource";
import { Types,Document } from "mongoose";


export class takeAssistanceUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }

    constructor(private AssistanceDataSource: AssistanceDataSource){}

    async main(course_id: string, student_id: string, date: string){
        try {
            await this.takeAsistence(course_id, student_id, date);
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async takeAsistence(course_id: string, student_id: string, date: string){
        const data= await this.AssistanceDataSource.takeAssistance(course_id, student_id, date)
        this.response= {status:true,data}
    }
}