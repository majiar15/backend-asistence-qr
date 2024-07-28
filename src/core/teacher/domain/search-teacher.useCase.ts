import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";
import { TeacherQueryParamsDto } from "../dto/get-teacher-pagination.dto";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Role } from "@common/utils/rol.enum";



export class SearchTeacherUseCase {

    name:string;
    response: ResponseDto<Users>;

    constructor(private userDatasource: UserDataSource) { }


    public async main(query: TeacherQueryParamsDto):Promise<ResponseDto<Users>> {
        try {
            this.validateName(query);
            await this.searchTeacher(query);
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private validateName(query:TeacherQueryParamsDto) {
        this.name = query.name;
        if (!this.name.trim()) {
            throw new BadRequestException('El nombre no puede estar vacío.');
        }
    }

    private async searchTeacher(querys:TeacherQueryParamsDto) {
        const {page,limit}=querys;
        const query = {
            delete: false,
            role:Role.Teacher,
            $or: [
                { name: { $regex: this.name, $options: 'i' } },
                { surnames: { $regex: this.name, $options: 'i' } }
            ]
        };
        const teachers = await this.userDatasource.searchUser(query, page, limit);

        if (!teachers) {
            throw new NotFoundException(`No se encontraron profesores con el nombre: ${this.name}`);
        }

        const itemCount = await this.userDatasource.getUserByNameCount(query);
        this.response = new ResponseDto<Users>(true, teachers, page, limit, itemCount)

    }
}