import { UserDataSource } from "@datasource/user.datasource";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { ConflictException } from "@nestjs/common";
import { Document, Types } from "mongoose";
import * as bcrypt from 'bcrypt';
import { Users } from "@datasource/models/user.model";




export class CreateTeacherUseCase {

    teacher!: CreateTeacherDto;
    response: { status: boolean; data: Document<unknown, {}, Users> & Users & { _id: Types.ObjectId; }; }

    constructor(private userDatasource: UserDataSource) { }

    async main(teacherObject: CreateTeacherDto) {

        try {
            //validar si ya existe el profesor
            await this.validateProfessorExistence(teacherObject)
            //encriptar la contraseña
            await this.hashPassword()
            //guardar el profesor
            const response = await this.saveTeacher()

            return response;
        } catch (error) {

            throw error
        }
    }

    private async validateProfessorExistence(teacherObject: CreateTeacherDto) {

        this.teacher = teacherObject;

        const findUser = await this.userDatasource.getUserByDni(this.teacher.dni);
        if (findUser) {
            throw new ConflictException('Teacher already exists')
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

        return this.response = { status: true, data }
    }
}