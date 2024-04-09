import { LoginUseCase } from "./domain/login.useCase"
import { UserDataSource } from "@datasource/user.datasource"
import { LoginAuthDto } from "./dto/login-auth.dto"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { RegisterAuthDto } from "./dto/register-auth.dto"
import { RegisterUseCase } from "./domain/register.useCase"

@Injectable()
export class AuthService {

  constructor(private readonly userModel: UserDataSource, private jwtService: JwtService) { }


  async login(userLoginObject: LoginAuthDto) {
    try {
      const userUseCase = new LoginUseCase(this.userModel, this.jwtService)
      const data = await userUseCase.main(userLoginObject)
      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(userRegister: RegisterAuthDto) {
    try {
      const userUseCase = new RegisterUseCase(this.userModel)
      const data = await userUseCase.main(userRegister)
      return data;
    } catch (error) {
      throw error
    }
  }
}
