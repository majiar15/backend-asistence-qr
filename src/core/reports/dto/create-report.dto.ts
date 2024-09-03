import { IsNotEmpty } from "class-validator";

export class CreateReportDto {}



export class ReportStudentDto{

    @IsNotEmpty({message:"El student_id no puede estar vacio."})
    student_id:string;
    @IsNotEmpty({message:"El course_id no puede estar vacio."})
    course_id:string;
}
