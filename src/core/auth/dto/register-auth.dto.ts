import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsEmail, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    
    @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
    name:string;

    @IsNotEmpty({ message: 'Los apellidos no debe estar vacío' })
    surnames:string;

    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    @IsNumber()
    @Min(1000000000,{message:"Debe agregar un telefonó valido."})
    phone:number;
    
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
    @IsEmail({},{ message: 'El correo electrónico no es válido' })
    email:string;

    role?: string;
}
