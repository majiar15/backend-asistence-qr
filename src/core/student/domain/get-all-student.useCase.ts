import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { PaginationQueryParamsDto } from "@common/utils/pagination/dto/pagination-query-params.dto";
import { StudentDocument } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";



export class GetAllStudentUseCase {

    response: ResponseDto<StudentDocument>;

    constructor(private studentDatasource: StudentDataSource) { }


    public async main(query:PaginationQueryParamsDto) {
        try {
            const { page, limit } = query;
            await this.getAllStudent(page, limit)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async getAllStudent(page: number, limit: number) {

        const data = await this.studentDatasource.getAllStudent(page,limit);
        const itemCount = await this.studentDatasource.getStudentsCount();

        this.response= new ResponseDto<StudentDocument>(true,data, page, limit, itemCount)
        
    }
}