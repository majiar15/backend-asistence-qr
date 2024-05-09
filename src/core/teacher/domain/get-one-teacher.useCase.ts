import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";
import { HttpException } from "@nestjs/common";
import { Document, Types } from "mongoose";



export class GetOneTeacherUseCase {

    response: { status: boolean; data: (Document<unknown, any, Users> & Users & { _id: Types.ObjectId; }); }

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
            throw new HttpException({ status: false, message: 'TEACHER NOT FOUND' }, 404)
        }

        this.response = { status: true, data };
    }
}