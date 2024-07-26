import { IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsNumber({},{message:"El documento de identidad debe ser un numero."})
    @IsNotEmpty({message:"El documento de identidad no puede estar vacío."})
    @Min(100000,{message:"El documento de identidad no es valido."})
    dni:number;

    @IsNotEmpty({message:"La contraseña no puede estar vacio."})
    @MinLength(4,{message:"La contraseña tener minimo 4 caracteres."})
    @MaxLength(30,{message:"La contraseña tener maximo 30 caracteres."})
    password:string;
}
