import { UserDataSource } from "@datasource/user.datasource";
import { UpdateTeacherDto } from "../dto/update-teacher.dto";
import { NotFoundException } from "@nestjs/common";
import { Users } from "@datasource/models/user.model";
import { Document, Types } from "mongoose";
import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";


export class UpdateTeachersUseCase {

    teacherFromDB!: Document<unknown, any, Users> & Users & { _id: Types.ObjectId; };
    response: ResponseDto<Users>;
    dataUpdate: any;
    id: string = "";
    constructor(private userDatasource: UserDataSource) { }

    public async main(id: string, updateTeacherDto: UpdateTeacherDto) {

        try {
            //Validate if the teacher exists
            await this.validateProfessorExistence(id);
            //Validate the data to be updated
            this.validateUpdateData(updateTeacherDto);

            //Update teacher details
            const response = await this.updateTeacherDB()
            return response;

        } catch (error) {
            throw error;
        }

    }

    private async validateProfessorExistence(id: string) {

        const findUser = await this.userDatasource.getUserById(id);
        if (!findUser) {
            throw new NotFoundException('El profesor no se encuentra registrado.');
        }
        this.teacherFromDB = findUser;
        this.id = id;
    }

    private async validateUpdateData(updateTeacherDto: UpdateTeacherDto) {
        this.dataUpdate = {};
        for (const [key, value] of Object.entries(updateTeacherDto)) {

            if (key in this.teacherFromDB) {
                if (value) {
                    this.dataUpdate[key] = value;
                }
            }
        }
    }

    private async updateTeacherDB() {

        const data = await this.userDatasource.updateUser(this.id, this.dataUpdate)
        this.response= new ResponseDto<Users>(true,data)
    }
}