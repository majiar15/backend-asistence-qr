import { IsArray, IsNotEmpty } from "class-validator";

export class CreateEnrollDto {

    @IsNotEmpty()
    course_id:string;

    @IsNotEmpty()
    @IsArray()
    students:string[]
}
