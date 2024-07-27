import { StudentDocument } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { HttpException } from "@nestjs/common";
import { Document, Types } from "mongoose";



export class GetOneStudentUseCase {

    response: { status: boolean; data: (Document<unknown, any, StudentDocument> & StudentDocument & { _id: Types.ObjectId; }); }

    constructor(private studentDatasource: StudentDataSource) { }


    public async main(id: string) {

        try {

            await this.getOneStudent(id);
            return this.response;

        } catch (error) {
            throw error;
        }

    }

    private async getOneStudent(id: string) {

        const data = await this.studentDatasource.getStudentById(id);

        if (!data) {
            throw new HttpException({ status: false, message: 'El estudiante no existe.' }, 404)
        }

        this.response = { status: true, data };
    }
}