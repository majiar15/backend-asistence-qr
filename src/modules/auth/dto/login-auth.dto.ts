import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    email:string;
    @MinLength(4)
    @MaxLength(30)
    password:string;
}
