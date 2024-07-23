import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsNumber()
    @IsNotEmpty()
    dni:number;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    password:string;
}
