import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { PaginationQueryParamsDto } from "@common/utils/pagination/dto/pagination-query-params.dto";
import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";



export class GetAllTeacherUseCase {

    response: ResponseDto<Users>;

    constructor(private userDatasource: UserDataSource) { }


    public async main(query:PaginationQueryParamsDto):Promise<ResponseDto<Users>> {
        try {
   
            await this.getAllTeacher(query)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async getAllTeacher(query:PaginationQueryParamsDto) {
        
        const { page, limit} = query;
        const data = await this.userDatasource.getAllUser('teacher',page, limit);
    
        const itemCount = await this.userDatasource.getUserCount('teacher');

        this.response= new ResponseDto<any>(true,data, page, limit, itemCount)
    }
}