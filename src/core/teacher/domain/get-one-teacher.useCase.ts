import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";
import { HttpException } from "@nestjs/common";



export class GetOneTeacherUseCase {

    response: ResponseDto<Users>;

    constructor(private userDatasource: UserDataSource) { }


    public async main(id: string) {

        try {

            await this.getOneTeacher(id);
            return this.response;
            
        } catch (error) {
            throw error;
        }

    }

    private async getOneTeacher(id: string) {

        const data = await this.userDatasource.getUserById(id);

        if (!data) {
            throw new HttpException({ status: false, message: 'No se encontró el profesor solicitado.' }, 404)
        }

        this.response= new ResponseDto<Users>(true,data)
    }
}