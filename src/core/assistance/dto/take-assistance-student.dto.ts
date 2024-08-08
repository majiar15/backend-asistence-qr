import { IsNotEmpty, IsString } from "class-validator";

export class TakeAssistanceStudentDTO {
    @IsNotEmpty()
    @IsString()
    secret:string;

    @IsNotEmpty()
    @IsString()
    studentId:string;

}
