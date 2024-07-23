import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { PaginationQueryParamsDto } from "@common/utils/pagination/dto/pagination-query-params.dto";
import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";



export class GetAllAdminUseCase {

    response: ResponseDto<Users>

    constructor(private userDatasource: UserDataSource) { }


    public async main(query:PaginationQueryParamsDto):Promise<ResponseDto<Users>> {
        try {
            await this.getAllAdmin(query)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async getAllAdmin(query:PaginationQueryParamsDto) {

        const { page, limit } = query;
        const data = await this.userDatasource.getAllUser('admin',page, limit);
        
        const itemCount = await this.userDatasource.getUserCount('admin');

        this.response= new ResponseDto<Users>(true,data, page, limit, itemCount)

    }
}