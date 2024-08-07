import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '@common/decorators/public.decorator';
import { Role } from '@common/utils/rol.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { SecretKey } from '@common/decorators/secret-key.decorator';
import { Payload } from '@common/decorators/payload.decorator';
import { IPayload } from '@common/interfaces/payload.interface';
import { StudentAuthDto } from './dto/student-auth.dto';
import { ChangePasswordDto, ValidatePhoneDto, ValidateUserDto } from './dto/change-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Este controlador realiza el registro de un usuario
   * @param registerAuthDto 
   * @returns 
   */
  @Roles(Role.Admin)
  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto, Role.Student);
  }

  @SecretKey()
  @Post('register/admin')
  registerAdmin(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto, Role.Admin);
  }

  @Roles(Role.Admin)
  @Post('register/teacher')
  registerTeacher(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto, Role.Teacher);
  }

  @Public()
  @Post('login')
  loginUser(@Body() userLoginObject: LoginAuthDto) {

    return this.authService.login(userLoginObject)
  }

  @Public()
  @Post('login/student')
  loginStudent(@Body() studentAuth: StudentAuthDto) {

    return this.authService.loginStudent(studentAuth)
  }

  @Post('update-password')
  updatePassword(@Body() updatePassword: UpdatePasswordDto, @Payload() payload: IPayload) {

    return this.authService.updatePassword(updatePassword,payload)
  }




  @Public()
  @Post('validate-user')
  validateUser(@Body() body: ValidateUserDto) {
    const { email, dni } = body;
    return this.authService.validateUser(email, dni);

  }

  @Public()
  @Post('validate-phone')
  async validatePhone(@Body() body: ValidatePhoneDto) {
    const { email, dni, phone } = body;
    return this.authService.validatePhone(email, dni, phone);

  }

  @Public()
  @Post('change-password')
  async setPassword(@Body() body: ChangePasswordDto) {

    return this.authService.setPassword(body);

  }

  @Get('current-authenticated-user')
  currentAuthenticatedUser(@Payload() payload: IPayload) {
    return { status: true, data: payload }
  }
}
