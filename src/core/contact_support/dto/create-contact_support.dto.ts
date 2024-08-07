import { IsNotEmpty } from "class-validator";

export class CreateContactSupportDto {

    @IsNotEmpty()
    student_id:string;

    @IsNotEmpty()
    message:string;
}
