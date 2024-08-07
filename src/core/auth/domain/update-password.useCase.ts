import { StudentDataSource } from "@datasource/student.datasource";
import { UserDataSource } from "@datasource/user.datasource";
import { UpdatePasswordDto } from "../dto/update-password.dto";
import { IPayload } from "@common/interfaces/payload.interface";
import { StudentDocument } from "@datasource/models/student.model";
import { UsersDocument } from "@datasource/models/user.model";
import { NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export class UpdatePasswordUseCase {

    private user:UsersDocument;
    private student:StudentDocument;
    private password:string;
    private response:{status:boolean,message:string};
    constructor(
        private userDataSource:UserDataSource,
        private studentDataSource:StudentDataSource,
    ){}

    async main(updatePassword: UpdatePasswordDto,payload:IPayload  ){

        try {

            await this.getUser(payload);
            await this.validatePassword(updatePassword.password,payload.role);
            await this.comparatePassword(updatePassword);
            await this.encriptPassword(updatePassword.new_password)
            await this.updatePassword(payload.role);
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    private async getUser(payload:IPayload){
        if(payload.role=='student'){
            this.student= await this.studentDataSource.getStudentByDni(payload.dni);
        }else{
            this.user = await this.userDataSource.getUserByDni(payload.dni)
        }

        if(!this.student && !this.user){
            throw new NotFoundException(`USER_NOT_FOUND`);
        }
    }

    private async validatePassword(password:string,role:string) {
        if(role=='student'){
            const compare = await bcrypt.compare(password, this.student.password);
            if(!compare){
                throw new NotFoundException(`CURRENT_PASSWORD_INCORRECT`)
            }
        }else{
            const compare = await bcrypt.compare(password, this.user.password);
            if(!compare){
                throw new NotFoundException(`CURRENT_PASSWORD_INCORRECT`)
            }
            
        }
        
    }

    private async comparatePassword(updatePassword: UpdatePasswordDto){
        if (updatePassword.new_password != updatePassword.confirm_password) {
            throw new NotFoundException(`PASSWORDS_NOT_MATCH`)
        }
    }

    private async encriptPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }

    private async updatePassword(role:string) {
        let data =null;
        if(role=='student'){
            data = await this.studentDataSource.updateStudent(this.student._id, { password: this.password})
        }else{
            data = await this.userDataSource.updateUser(this.user._id, { password: this.password, })
        }
        

        if (!data) {
            throw new NotFoundException(`PASSWORD_CHANGE_FAILED`)
        }
        this.response = { status: true, message: 'La contraseña se cambio correctamente.' }
    }
}