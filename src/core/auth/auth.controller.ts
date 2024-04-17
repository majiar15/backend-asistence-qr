import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '@common/decorators/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Este controlador realiza el registro de un usuario
   * @param registerAuthDto 
   * @returns 
   */
  @Public()
  @Post('register')
  regiterUser(@Body() registerAuthDto: RegisterAuthDto) {

    return this.authService.register(registerAuthDto);
  }


  @Public()
  @Post('login')
  loginUser(@Body() userLoginObject: LoginAuthDto) {

    return this.authService.login(userLoginObject)
  }
  
}
