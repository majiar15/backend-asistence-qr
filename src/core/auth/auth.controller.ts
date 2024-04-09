import { Controller, Post, Body, Get,Request, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '@common/decorators/public.decorator';
import { EnvConfiguration } from '@common/config/env.config';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Este controlador realiza el registro de un usuario
   * @param registerAuthDto 
   * @returns 
   */
  @Public()
  @Post('register')
  regiterUser(@Body() registerAuthDto: RegisterAuthDto) {
    console.log({body:registerAuthDto});
    
    return this.authService.register(registerAuthDto);
  }
  @Public()
  @Post('login')
  loginUser(@Body() userLoginObject:LoginAuthDto){
    console.log( "ENV: ",EnvConfiguration().jwt_secret);
    
    return this.authService.login(userLoginObject)
  }
  
  @Get('user/:id')
  getUser(@Param() params: any){
  console.log("🚀 ~ AuthController ~ getUser ~ req:",params)
  return `This action returns a #${params.id} cat`;
  }

  
}
