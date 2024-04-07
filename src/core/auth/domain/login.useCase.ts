
import { UserDataSource } from "@datasource/user.datasource";
import { LoginAuthDto } from "../dto/login-auth.dto";
import { Users } from "@datasource/models/user.model";
import { HttpException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { Document, Types } from "mongoose";
import { JwtService } from "@nestjs/jwt";


export class LoginUseCase {
  user!: Document<unknown, {}, Users> & Users & {
    _id: Types.ObjectId;
  };
  email: string = '';
  password: string = '';
  response: { token: string; data: Document<unknown, {}, Users> & Users & { _id: Types.ObjectId; }; }
  constructor(private userDatasource: UserDataSource,private jwtService: JwtService) {}

  async main(userLoginObject: LoginAuthDto) {
    try {
      this.subtractDataBody(userLoginObject)
      await this.getDataUser()
      await this.checkAndDecodePassword()
      await this.generateTokenJWT()
    } catch (error) {
      throw error
    }
    return this.response
  }



  private subtractDataBody(userLoginObject: LoginAuthDto){
    console.log("subtractDataBody ===================");

    this.email = userLoginObject.email;
    this.password = userLoginObject.password;
  }
  private async getDataUser(){
    const findUser = await this.userDatasource.getUserByEmail(this.email);
    console.log("findUser ===================", findUser);
    if (!findUser){
      throw new HttpException('USER_NOT_FOUND', 404)
    }
    this.user = findUser;
  }
  private async checkAndDecodePassword() {
    const checkPassword = await bcrypt.compare(this.password, this.user.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)
    this.user.set('password', undefined, { strict: false })
  }
  private async generateTokenJWT() {
    const payload ={
      id: this.user._id,
      name: this.user.name,
      email: this.user.email
    }
    const token = await this.jwtService.sign(payload);
    this.response = {token, data: this.user};
  }
}
