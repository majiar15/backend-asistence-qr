import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { LoginAuthDto } from "./login-auth.dto";


export class StudentAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty({message:"La brand del dispostivo es requerido."})
    brand:string;

    @IsNotEmpty({message:"El display del dispostivo es requerido."})
    display:string;

    @IsNotEmpty({message:"El DEVICE_ID del dispostivo es requerido."})
    device_id:string;

    @IsNotEmpty({message:"El modelo del dispostivo es requerido."})
    model:string;
}
