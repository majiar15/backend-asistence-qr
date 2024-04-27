import { UserDataSource } from "@datasource/user.datasource";



export class DeleteAdminUseCase {

    response: { status: boolean; data: any; }

    constructor(private userDatasource: UserDataSource) { }


    public async main(id:string) {
        try {
            await this.deleteAdmin(id)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async deleteAdmin(id:string) {

        const data = await this.userDatasource.deleteUser(id);
        this.response = { status: true, data };

    }
}