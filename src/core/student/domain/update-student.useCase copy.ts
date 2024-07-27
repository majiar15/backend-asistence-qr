import { NotFoundException } from "@nestjs/common";
import { Document, Types } from "mongoose";
import { Student } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { UpdateStudentDto } from "../dto/update-student.dto";


export class UpdateStudentUseCase {

    studentDb!: Document<unknown, any, Student> & Student & { _id: Types.ObjectId; };
    response: { status: boolean; data: Document<unknown, any, Student> & Student & { _id: Types.ObjectId; }; }
    dataUpdate: any;
    id: string = "";
    constructor(private studentDatasource: StudentDataSource) { }

    public async main(id: string, updateTeacherDto: UpdateStudentDto) {

        try {
            //Validate if the teacher exists
            await this.validateStudentExistence(id);
            //Validate the data to be updated
            this.validateUpdateData(updateTeacherDto);

            //Update teacher details
            await this.updateStudentDB()
            return this.response;

        } catch (error) {
            throw error;
        }

    }

    private async validateStudentExistence(id: string) {

        const findUser = await this.studentDatasource.getStudentById(id);
        if (!findUser) {
            throw new NotFoundException('El estudiante no existe.');
        }
        this.studentDb = findUser;
        this.id = id;
    }

    private async validateUpdateData(updateStudentDto: UpdateStudentDto) {
        this.dataUpdate = {};
        for (const [key, value] of Object.entries(updateStudentDto)) {

            if (key in this.studentDb) {
                if (value) {
                    this.dataUpdate[key] = value;
                }
            }
        }
    }

    private async updateStudentDB() {

        const data = await this.studentDatasource.updateStudent(this.id, this.dataUpdate)
        this.response = { status: true, data }
    }
}