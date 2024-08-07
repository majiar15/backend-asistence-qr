import { ContactSupportDataSource } from "@datasource/contact_support.datasource";
import { CreateContactSupportDto } from "../dto/create-contact_support.dto";
import { getDateUTC } from "@common/utils/getDateUTC";
import { ForbiddenException } from "@nestjs/common";


export class CreateContactSupportUseCase{

    response:{status:boolean,message:string}

    constructor(
        private contactSupportDataSource:ContactSupportDataSource
    ){}

    async main(body: CreateContactSupportDto){

        try {
            await this.saveContactSuport(body)
        } catch (error) {
            throw error;
        }

    }

    private async saveContactSuport(body: CreateContactSupportDto){
        const data = {
            student:body.student_id,
            message:body.message,
            date: getDateUTC()
        }

        const responde = await this.contactSupportDataSource.create(data);
        if(!responde){
            throw new ForbiddenException("SUPPORT_MESSAGE_NOT_SAVED");
        }

        this.response = {status:true,message:"Message enviado correctamente."}
    }
}