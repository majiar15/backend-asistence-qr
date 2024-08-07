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
import { LoginStudentUseCase } from "./domain/login-student.useCase"
import { StudentDataSource } from "@datasource/student.datasource"
import { StudentAuthDto } from "./dto/student-auth.dto"
import { DeviceDataSource } from "@datasource/device.datasource"
import { ValidateUserUseCase } from "./domain/validateUser.useCase"
import { ValidatePhoneUseCase } from "./domain/validate_phone.useCase"
import { ChangePasswordUseCase } from "./domain/change_password.useCase"
import { ChangePasswordDto } from "./dto/change-password.dto"
import { UpdatePasswordUseCase } from "./domain/update-password.useCase"
import { UpdatePasswordDto } from "./dto/update-password.dto"
import { IPayload } from "@common/interfaces/payload.interface"

@Injectable()
export class AuthService {

  constructor(
    private readonly userModel: UserDataSource,
    private readonly studentModel: StudentDataSource,
    private readonly deviceModel: DeviceDataSource,
    private readonly secretModel: SecretDataSource,
    private jwtService: JwtService,
  ) { }


  async loginStudent(studentAuth: StudentAuthDto) {
    try {
      const userUseCase = new LoginStudentUseCase(this.studentModel, this.deviceModel, this.jwtService)
      const data = await userUseCase.main(studentAuth)
      return data;
    } catch (error) {
      throw error;
    }
  }

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



  async validateUser(email: string, dni: number) {
    try {
      const validateUser = new ValidateUserUseCase(this.studentModel);
      const data = await validateUser.main(email, dni);
      return data;

    } catch (error) {

      throw error
    }
  }


  async validatePhone(email: string, dni: number, phone: number) {
    try {
      const validateUser = new ValidatePhoneUseCase(this.studentModel);
      const data = await validateUser.main(email, dni, phone);
      return data;

    } catch (error) {

      throw error
    }
  }

  async setPassword(body: ChangePasswordDto) {
    try {
      const validateUser = new ChangePasswordUseCase(this.studentModel);
      const data = await validateUser.main(body);
      return data;

    } catch (error) {

      throw error
    }
  }


  async updatePassword(updatePassword: UpdatePasswordDto,payload:IPayload ) {
    try {
      const validateUser = new UpdatePasswordUseCase(this.userModel,this.studentModel);
      const data = await validateUser.main(updatePassword,payload);
      return data;

    } catch (error) {

      throw error
    }
  }
}
