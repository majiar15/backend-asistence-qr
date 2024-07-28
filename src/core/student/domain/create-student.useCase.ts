import { CreateStudentDto } from "../dto/create-student.dto";
import { StudentDataSource } from "@datasource/student.datasource";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { Student } from "@datasource/models/student.model";


export class CreateStudentUseCase {

    student: CreateStudentDto;


    response: ResponseDto<Student>;

    constructor(private studentDataSource: StudentDataSource) { }

    async main(studentObject: CreateStudentDto) {

        try {
            this.student = studentObject;
            //Validar si el estudiante existe
            await this.validateStudentExistence()

            await this.hashPassword();
            //Gudardar estudiante

            await this.saveStudent();

            return this.response;

        } catch (error) {
            throw error;
        }



    }

    async validateStudentExistence() {
        const student = await this.studentDataSource.getStudent(this.student.dni);

        if (student) {

            throw new ConflictException('El estudiante ya está registrado.')

        }
    }

    private async hashPassword() {

        const passwordHash = await bcrypt.hash(this.student.password, 10);
        this.student = { ...this.student, password: passwordHash };

    }

    async saveStudent() {
        const data= await this.studentDataSource.saveStudent(this.student)
         data.set('password', undefined, { strict: false })
         data.set('delete', undefined, { strict: false })

        this.response= new ResponseDto<Student>(true,data)
    }
}