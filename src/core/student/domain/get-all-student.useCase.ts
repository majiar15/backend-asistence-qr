import { Users } from "@datasource/models/user.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { Document, Types } from "mongoose";



export class GetAllStudentUseCase {

    response: { status: boolean; data: (Document<unknown, {}, Users> & Users & { _id: Types.ObjectId; })[]; }

    constructor(private studentDatasource: StudentDataSource) { }


    public async main() {
        try {
            await this.getAllStudent()
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async getAllStudent() {

        const data = await this.studentDatasource.getAllStudent();
        this.response = { status: true, data };

    }
}