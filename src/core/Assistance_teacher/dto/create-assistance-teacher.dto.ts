import { IsNotEmpty, IsString } from "class-validator";

export class CreateAssistanceDTO {
    @IsNotEmpty()
    @IsString()
    courseId:string;

    @IsNotEmpty()
    @IsString()
    secret: string;

    @IsNotEmpty()
    @IsString()
    bitacora: string;


}
