import { AssistanceDataSource } from "@datasource/assistance.datasource";

export class GetByDateAssistanceUseCase {

    response;

    constructor(private AssistanceDataSource: AssistanceDataSource){}

    async main(date: Date, course_id: string){
        try {
            await this.getAsistanceBydate(date, course_id)
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async getAsistanceBydate(date: Date,course_id: string){
        const assist = await this.AssistanceDataSource.getAssistanceByDate(date,course_id);
        this.response = {
            status: true,
            data: assist
        }
    }
}