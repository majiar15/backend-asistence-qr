import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { Courses } from "@datasource/models/course.model";
import { NotFoundException } from '@nestjs/common';
import { Types, Document } from "mongoose";

export class UpdateSecretAssistanceTeacherUseCase {

    response: { status: boolean; data: Document<unknown, object, any> & any & { _id: Types.ObjectId; }; }
    course: Courses;
    constructor(
        private AssistanceTeacherDataSource: AssistanceTeacherDataSource
    ) {}

    
    async main(bitacoraId: string, secret: string, teacher_id: string) {
        try {
            await this.updateBitacora(bitacoraId, secret, teacher_id);
            return this.response;
        } catch (error) {
            throw error;
        }
    }


    async updateBitacora(bitacoraId: string, secret: string,teacher_id:string) {
        const bitacora = await this.AssistanceTeacherDataSource.updateSecret(bitacoraId,secret, teacher_id);
        if (!bitacora) {
            throw new NotFoundException('Bitacora no encontrada');
        }
        this.response = {
            status: true,
            data: bitacora
        };

    }

}
