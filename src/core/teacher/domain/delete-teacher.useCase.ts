import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { UserDataSource } from "@datasource/user.datasource";



export class DeleteTeacherUseCase {

    response: ResponseDto<any>;

    constructor(private userDatasource: UserDataSource) { }


    public async main(id:string) {
        try {
            await this.deleteTeacher(id)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async deleteTeacher(id:string) {
        
        const data = await this.userDatasource.deleteUser(id);
        if(data.delete){
         
            this.response= new ResponseDto<any>(true,{deletedCount:1})
            return;
        }
        this.response= new ResponseDto<any>(false,{deletedCount:0})

    }
}