import { StudentDocument } from "@datasource/models/student.model";
import { CreateStudentDto } from "../dto/create-student.dto";
import { Document, Types } from "mongoose";
import { StudentDataSource } from "@datasource/student.datasource";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';


export class CreateStudentUseCase {

    student: CreateStudentDto;
    studentDb: StudentDocument;


    response: { status: boolean; data: Document<unknown, {}, any> & any & { _id: Types.ObjectId; }; }

    constructor(private studentDataSource: StudentDataSource) { }

    async main(studentObject: CreateStudentDto) {

        try {
            this.student = studentObject;
            console.log("🚀 ~ CreateStudentUseCase ~ main ~ studentObject:", studentObject)
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
        console.log("🚀 ~ CreateStudentUseCase ~ validateStudentExistence ~ student:", student)

        if (student) {

            throw new ConflictException('Student already exists')

        }
    }

    private async hashPassword() {

        const passwordHash = await bcrypt.hash(this.student.password, 10);
        this.student = { ...this.student, password: passwordHash };

    }

    async saveStudent() {
        this.studentDb = await this.studentDataSource.saveStudent(this.student)

        console.log("🚀 ~ STUDENT DB:", this.studentDb)
        this.response = { status: true, data: this.studentDb }
    }
}