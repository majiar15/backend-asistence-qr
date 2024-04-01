import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';




@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private jwtService: JwtService
    ) { }

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const passwordHash = await bcrypt.hash(password, 10);
    userObject = { ...userObject, password: passwordHash }
    console.log("🚀 ~ AuthService ~ register ~ registerAuthDto:", userObject)
    return this.usersModel.create(userObject);
  }

  async login(userLoginObject: LoginAuthDto) {
    console.log("🚀 ~ AuthService ~ login ~ userLoginObject:", userLoginObject)
    const { email, password } = userLoginObject;
    const findUser = await this.usersModel.findOne({ email })
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)
    findUser.set('password', undefined, { strict: false })
    const payload ={id:findUser._id,name:findUser.name,email:findUser.email}
    const token =await this.jwtService.sign(payload);
    const data = {token,data:findUser};
    return data;

  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // // update(id: number, updateAuthDto: UpdateAuthDto) {
  // //   return `This action updates a #${id} auth`;
  // // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
