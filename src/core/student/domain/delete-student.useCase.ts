import { StudentDataSource } from "@datasource/student.datasource";



export class DeleteStudentUseCase {

    response: { status: boolean; data: any; }

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
        this.response = { status: true, data };

    }
}