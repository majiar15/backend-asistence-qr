import { IsEmail, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateStudentDto {

    @IsNotEmpty({ message: 'El nombre no debe estar vacío.' })
    name: string;

    @IsNotEmpty({ message: 'Los apellidos no debe estar vacío.' })
    surnames: string;

    @IsNumber({}, { message: "El documento de identidad debe ser un numero." })
    @IsNotEmpty({ message: "El documento de identidad no puede estar vacío." })
    @Min(100000, { message: "El documento de identidad no es valido." })
    dni: number;

    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    @IsNumber()
    @Min(1000000000, { message: "Debe agregar un telefonó valido." })
    @Max(10000000000, { message: "Debe agregar un telefonó valido." })
    phone: number;

    @IsNotEmpty({ message: 'El codigo del estudiante no puede estar vacío' })
    @Min(100000, { message: "El codigo del estudiante debe tener minimo 6 numeros." })
    code: number;

    @IsNotEmpty()
    academic_program: string;

    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío.' })
    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email: string;

    @IsNotEmpty({ message: "La contraseña no puede estar vacio." })
    @MinLength(4, { message: "La contraseña tener minimo 4 caracteres." })
    @MaxLength(30, { message: "La contraseña tener maximo 30 caracteres." })
    password: string;
}
