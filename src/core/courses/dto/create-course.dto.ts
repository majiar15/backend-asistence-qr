import { Type } from "class-transformer";
import { IsNotEmpty, MinLength, ValidateNested } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    name:string;


    @IsNotEmpty()
    teacher_id :string;

    @IsNotEmpty()
    date_start:Date;

    @IsNotEmpty()
    date_end:Date;

    @IsNotEmpty()
    intensity:number;

    @IsNotEmpty()
    academic_programs:any[];

    description:string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules:ScheduleDto[];
}

export class ScheduleDto {

    @IsNotEmpty()
    hour_start:string;

    @IsNotEmpty()
    hour_end:string;

    @IsNotEmpty()
    @MinLength(4)
    week_day:string;

    @IsNotEmpty()
    room:string;
}
