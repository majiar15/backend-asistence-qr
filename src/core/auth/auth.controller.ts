import { Controller, Post, Body, Get} from '@nestjs/common';
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

  @Get('current-authenticated-user')
  currentAuthenticatedUser(@Payload() payload: IPayload){
    return {status:true,data:payload}
  }
}
