import { UserDataSource } from "@datasource/user.datasource";



export class DeleteTeacherUseCase {

    response: { status: boolean; data: any; }

    constructor(private userDatasource: UserDataSource) { }


    public async main(id:string) {
        try {
            await this.deleteTeacher(id)
            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async deleteTeacher(id:string) {
        
        const data = await this.userDatasource.deleteUser(id);
        if(data.delete){
            this.response = { status: true, data:{deletedCount:1} };
            return;
        }
        this.response = { status: false, data:{deletedCount:0} };
        

    }
}