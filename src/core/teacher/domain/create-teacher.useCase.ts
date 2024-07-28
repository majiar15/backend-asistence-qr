import { UserDataSource } from "@datasource/user.datasource";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Users } from "@datasource/models/user.model";
import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";




export class CreateTeacherUseCase {

    teacher!: CreateTeacherDto;
    response: ResponseDto<Users>;

    constructor(private userDatasource: UserDataSource) { }

    async main(teacherObject: CreateTeacherDto) {

        try {
            //validar si ya existe el profesor
            await this.validateProfessorExistence(teacherObject)
            //encriptar la contraseña
            await this.hashPassword()
            //guardar el profesor
           await this.saveTeacher()

            return this.response;
        } catch (error) {

            throw error
        }
    }

    private async validateProfessorExistence(teacherObject: CreateTeacherDto) {

        this.teacher = teacherObject;

        const findUser = await this.userDatasource.getUserByDni(this.teacher.dni);
        if (findUser) {
            throw new ConflictException('Ya existe un profesor con ese documento de identidad.')
        }
    }

    private async hashPassword() {
        
        const passwordHash = await bcrypt.hash(this.teacher.password, 10);
        this.teacher = { ...this.teacher, password: passwordHash };

    }

    private async saveTeacher() {

        this.teacher['role'] = 'teacher';

        const data = await this.userDatasource.saveUser(this.teacher)

        data.set('password', undefined, { strict: false })
        data.set('delete', undefined, { strict: false })

        this.response= new ResponseDto<Users>(true,data)
    }
}