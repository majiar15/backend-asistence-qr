import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1000000)
    dni:number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1000000000)
    phone:number

}
