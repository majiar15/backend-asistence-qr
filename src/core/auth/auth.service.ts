import { LoginUseCase } from "./domain/login.useCase"
import { UserDataSource } from "@datasource/user.datasource"
import { LoginAuthDto } from "./dto/login-auth.dto"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { RegisterAuthDto } from "./dto/register-auth.dto"
import { RegisterUseCase } from "./domain/register.useCase"
import { Role } from "@common/utils/rol.enum"
import { validateSecretUseCase } from "./domain/validate-secret-key.useCase"
import { SecretDataSource } from "@datasource/secret.datasource"

@Injectable()
export class AuthService {

  constructor(
    private readonly userModel: UserDataSource,
    private readonly secretModel: SecretDataSource,
    private jwtService: JwtService,
  ) { }


  async login(userLoginObject: LoginAuthDto) {
    try {
      const userUseCase = new LoginUseCase(this.userModel, this.jwtService)
      const data = await userUseCase.main(userLoginObject)
      return data;
    } catch (error) {
      throw error;
    }
  }
  async register(userRegister: RegisterAuthDto, role: Role) {
    try {
      const userUseCase = new RegisterUseCase(this.userModel, role)
      userRegister.role = role;
      const data = await userUseCase.main(userRegister)
      return data;
    } catch (error) {
      throw error
    }
  }
  async validateSecretKey(secretKey: string) {
    try {
      const userUseCase = new validateSecretUseCase(this.secretModel, secretKey)
      const data = await userUseCase.main();
      return data;
    } catch (error) {
      throw error
    }
  }
}
