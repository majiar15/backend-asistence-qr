import { Users } from "@datasource/models/user.model";
import { UserDataSource } from "@datasource/user.datasource";



export class GetAllAdminUseCase {

    response: { status: boolean; data:  Users[]; }

    constructor(private userDatasource: UserDataSource) { }


    public async main() {
        try {
            await this.getAllAdmin()
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async getAllAdmin() {

        const data = await this.userDatasource.getAllUser('admin');
        this.response = { status: true, data };

    }
}