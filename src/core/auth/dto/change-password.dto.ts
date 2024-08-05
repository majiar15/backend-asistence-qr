import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";


export class ValidateUserDto {
    @IsNumber({}, { message: "El documento de identidad debe ser un numero." })
    @IsNotEmpty({ message: "El documento de identidad no puede estar vacío." })
    @Min(100000, { message: "El documento de identidad no es valido." })
    dni: number;

    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;
}

export class ValidatePhoneDto extends PartialType(ValidateUserDto) {

    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    @IsNumber()
    @Min(1000000000, { message: "Debe agregar un telefonó valido." })
    phone: number;
}


export class ChangePasswordDto {

    @IsNumber({}, { message: "El documento de identidad debe ser un numero." })
    @IsNotEmpty({ message: "El documento de identidad no puede estar vacío." })
    @Min(100000, { message: "El documento de identidad no es valido." })
    dni: number;


    @IsNotEmpty({ message: 'El hash no puede estar vacio.' })
    hash: string;


    @IsNotEmpty({ message: "La contraseña no puede estar vacio." })
    @MinLength(4, { message: "La contraseña tener minimo 4 caracteres." })
    @MaxLength(30, { message: "La contraseña tener maximo 30 caracteres." })
    password: string;

    @IsNotEmpty({ message: "La confirmacion contraseña no puede estar vacio." })
    @MinLength(4, { message: "La confirmacion contraseña tener minimo 4 caracteres." })
    @MaxLength(30, { message: "La confirmacion contraseña tener maximo 30 caracteres." })
    confirm_password: string;
}

