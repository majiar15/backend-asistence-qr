import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsNumber, Length, MinLength } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    @IsNumber()
    @MinLength(7)
    dni:number;
    @IsNotEmpty()
    @IsNumber()
    @Length(10)
    phone:number
}
