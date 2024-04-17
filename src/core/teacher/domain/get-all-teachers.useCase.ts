import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";
import { Document, Types } from "mongoose";



export class GetAllTeacherUseCase {

    response: { status: boolean; data: (Document<unknown, {}, Users> & Users & { _id: Types.ObjectId; })[]; }

    constructor(private userDatasource: UserDataSource) { }


    public async main() {
        try {
            await this.getAllTeacher()
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async getAllTeacher() {
        
        const data = await this.userDatasource.getAllUser('teacher');
        this.response = { status: true, data };

    }
}