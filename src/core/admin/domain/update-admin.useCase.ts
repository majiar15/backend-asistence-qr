import { UserDataSource } from "@datasource/user.datasource";
import { UpdateAdminDto } from "../dto/update-admin.dto";
import { NotFoundException } from "@nestjs/common";
import { Users } from "@datasource/models/user.model";


export class UpdateAdminUseCase {

    adminFromDB!:Users ;
    response: { status: boolean; data: Users; }
    dataUpdate: any;
    id: string = "";
    constructor(private userDatasource: UserDataSource) { }

    public async main(id: string, updateAdminDto: UpdateAdminDto) {

        try {
            await this.validate(id);
            this.validateUpdateData(updateAdminDto);

            const response = await this.updateAdminDB()
            return response;

        } catch (error) {
            throw error;
        }

    }

    private async validate(id: string) {

        const findUser = await this.userDatasource.getUserById(id);
        if (!findUser) {
            throw new NotFoundException('ADMIN NOT FOUND');
        }
        this.adminFromDB = findUser;
        this.id = id;
    }

    private async validateUpdateData(updateAdminDto: UpdateAdminDto) {
        this.dataUpdate = {};
        for (const [key, value] of Object.entries(updateAdminDto)) {

            if (key in this.adminFromDB) {
                if (value) {
                    this.dataUpdate[key] = value;
                }
            }
        }
    }

    private async updateAdminDB() {

        const data = await this.userDatasource.updateUser(this.id, this.dataUpdate)
        return this.response = { status: true, data }
    }
}