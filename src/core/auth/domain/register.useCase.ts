
import { UserDataSource } from "@datasource/user.datasource";
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from "../dto/register-auth.dto";
import { Role } from "@common/utils/rol.enum";
import { ConflictException } from "@nestjs/common";
import { Types, Document } from "mongoose";


export class RegisterUseCase {
  user!: RegisterAuthDto;
  role: Role
  response: { status: boolean; data: Document<unknown, any, any> & any & { _id: Types.ObjectId; }; }

  constructor(private userDatasource: UserDataSource, role: Role) { 
    this.role = role;
  }

  async main(userRegister: RegisterAuthDto) {

    try {
      await this.getUser(userRegister.email,userRegister.dni)
      await this.hashPassword(userRegister)
      await this.saveUser()
      return this.response;

    } catch (error) {

      throw error
    }
  }

  private async getUser(email:string,dni:number){

    const existingUser = await this.userDatasource.getUserByEmail(email,dni)
    if(existingUser){
      if(email == existingUser.email){
        throw new ConflictException('Este correo electrónico ya está asociado a una cuenta existente.');
      }
      if (dni ==  existingUser.dni) {
        throw new ConflictException('Este documento de identidad ya está asociado a una cuenta existente.');
      }
    }
    
  }


  private async hashPassword(userRegister: RegisterAuthDto) {

    const passwordHash = await bcrypt.hash(userRegister.password, 10);
    this.user = { ...userRegister, password: passwordHash };

  }
  private async saveUser() {
    const data = await this.userDatasource.saveUser(this.user);

    data.set('password', undefined, { strict: false })
    data.set('delete', undefined, { strict: false })

    this.response = {status:true,data}
  }
}
