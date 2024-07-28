import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentDataSource } from "@datasource/student.datasource";


export class DeleteStudentUseCase {

    response: ResponseDto<any>;

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
            this.response= new ResponseDto<any>(false,{deletedCount:1})
            return;
        }
  
        this.response= new ResponseDto<any>(false,{deletedCount:0})
    }
}