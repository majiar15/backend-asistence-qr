import { IsNotEmpty, IsString } from "class-validator";

export class TakeAssistanceDTO {
    @IsNotEmpty()
    @IsString()
    courseId:string;

    @IsNotEmpty()
    @IsString()
    studentId:string;

}
