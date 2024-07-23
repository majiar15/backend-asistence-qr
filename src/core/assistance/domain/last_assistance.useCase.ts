
import { formatDate } from "@common/utils/formatDate";
import { AssistanceDataSource } from "@datasource/assistance.datasource";

export class LastAssistanceUseCase {

    response;

    constructor(private AssistanceDataSource: AssistanceDataSource){}

    async main(course_id: string){
        try {
            await this.getLastAssistance(course_id)
            console.log(this.response);
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async getLastAssistance(course_id: string){
        const assist = await this.AssistanceDataSource.getLastAssistance(course_id);
        console.log(assist);
        this.response = {
            status: true,
            data:{
                course_id,
                date: formatDate(assist?.date)
            }
        }
    }
}