import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { PaginationQueryParamsDto } from "@common/utils/pagination/dto/pagination-query-params.dto";
import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";



export class SearchTeacherUseCase {

    response: ResponseDto<Users>;

    constructor(private userDatasource: UserDataSource) { }


    public async main(search: string, query: PaginationQueryParamsDto):Promise<ResponseDto<Users>> {
        try {
   
            await this.searchTeacher(search, query)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async searchTeacher(search:string, query:PaginationQueryParamsDto) {
        
        const { page, limit} = query;
        const data = await this.userDatasource.searchUser('teacher', search ,page, limit);
    
        const itemCount = await this.userDatasource.getUserCountSearch('teacher', search);

        this.response= new ResponseDto<any>(true,data, page, limit, itemCount)
    }
}