import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";
import { HttpException } from "@nestjs/common";



export class GetOneAdminUseCase {

    response: { status: boolean; data: Users; }

    constructor(private userDatasource: UserDataSource) { }


    public async main(id: string) {

        try {

            await this.getOneAdmin(id);
            return this.response;

        } catch (error) {
            throw error;
        }

    }

    private async getOneAdmin(id: string) {

        const data = await this.userDatasource.getUserById(id);

        if (!data) {
            throw new HttpException({ status: false, message: 'ADMIN NOT FOUND' }, 404)
        }

        this.response = { status: true, data };
    }
}