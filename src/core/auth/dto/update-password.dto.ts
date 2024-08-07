import { IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class UpdatePasswordDto{

    @IsNotEmpty({message:"La contraseña no puede estar vacio."})
    @MinLength(4,{message:"La contraseña tener minimo 4 caracteres."})
    @MaxLength(30,{message:"La contraseña tener maximo 30 caracteres."})
    password:string;

    @IsNotEmpty({message:"La nueva contraseña no puede estar vacio."})
    @MinLength(4,{message:"La nueva contraseña tener minimo 4 caracteres."})
    @MaxLength(30,{message:"La nueva contraseña tener maximo 30 caracteres."})
    new_password:string;

    @IsNotEmpty({message:"La confirmcion de la contraseña no puede estar vacio."})
    @MinLength(4,{message:"La confirmcion de la contraseña tener minimo 4 caracteres."})
    @MaxLength(30,{message:"La confirmcion de la contraseña tener maximo 30 caracteres."})
    confirm_password:string
}