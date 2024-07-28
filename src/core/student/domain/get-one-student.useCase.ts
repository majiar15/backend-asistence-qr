import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { Student } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { HttpException } from "@nestjs/common";



export class GetOneStudentUseCase {

    response: ResponseDto<Student>;

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
            throw new HttpException({ status: false, message: 'El estudiante no se encuentra registrado.' }, 404)
        }

        this.response= new ResponseDto<Student>(true,data)
    }
}