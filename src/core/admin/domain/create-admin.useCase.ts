import { UserDataSource } from "@datasource/user.datasource";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Users } from "@datasource/models/user.model";




export class CreateAdminUseCase {

    admin!: CreateAdminDto;
    response: {data: Users, status: boolean};

    constructor(private userDatasource: UserDataSource) { }

    async main(adminObject: CreateAdminDto) {

        try {
            await this.validate(adminObject)
            await this.hashPassword()
            const response = await this.saveAdmin()

            return response;
        } catch (error) {

            throw error
        }
    }

    private async validate(adminObject: CreateAdminDto) {
        this.admin = adminObject;

        const findUser = await this.userDatasource.getUserByDni(this.admin.dni);
        if (findUser) {
            throw new ConflictException('Admin already exists')
        }
    }

    private async hashPassword() {
        const passwordHash = await bcrypt.hash(this.admin.password, 10);
        this.admin = { ...this.admin, password: passwordHash };
    }

    private async saveAdmin() {

        this.admin['role'] = 'admin';

        const data = await this.userDatasource.saveUser(this.admin)

        data.set('password', undefined, { strict: false })

        return this.response = { status: true, data }
    }
}