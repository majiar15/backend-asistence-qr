import { IsEmail, IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator";

export class CreateTeacherDto {

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    surnames:string;

    @IsNotEmpty()
    @IsNumber()
    @Min(100000)
    dni:number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1000000000)
    phone:number;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    password:string;

}
