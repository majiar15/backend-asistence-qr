import { StudentDataSource } from "@datasource/student.datasource";
import { Document, Types } from "mongoose";


export class DeleteStudentUseCase {

    response: { status: boolean; data: Document<unknown, any, any> & any & { _id: Types.ObjectId; }; }

    constructor(private studentDatasource: StudentDataSource) { }


    public async main(id: string) {
        try {
            await this.deleteStudent(id)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async deleteStudent(id: string) {

        const data = await this.studentDatasource.deleteStudent(id);
        if(data.delete){
            this.response = { status: true, data:{deletedCount:1} };
            return;
        }
        this.response = { status: false, data:{deletedCount:0} };
    }
}