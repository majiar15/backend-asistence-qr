import { Users } from "@datasource/models/user.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { HttpException } from "@nestjs/common";
import { Document, Types } from "mongoose";



export class GetOneStudentUseCase {

    response: { status: boolean; data: (Document<unknown, {}, Users> & Users & { _id: Types.ObjectId; }); }

    constructor(private studentDatasource: StudentDataSource) { }


    public async main(id: string) {

        try {

            await this.getOneTeacher(id);
            return this.response;

        } catch (error) {
            throw error;
        }

    }

    private async getOneTeacher(id: string) {

        const data = await this.studentDatasource.getStudentById(id);

        if (!data) {
            throw new HttpException({ status: false, message: 'STUDENT NOT FOUND' }, 404)
        }

        this.response = { status: true, data };
    }
}