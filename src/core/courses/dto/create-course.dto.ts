import { Type } from "class-transformer";
import { IsNotEmpty, MinLength, ValidateNested } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    name:string;


    @IsNotEmpty()
    teacher_id :string;

    @IsNotEmpty()
    start:string;

    @IsNotEmpty()
    end:string;

    description:string;

    @IsNotEmpty()
    room:string;

    status:boolean;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules:ScheduleDto[];
}

export class ScheduleDto {

    @IsNotEmpty()
    start_hour:string;

    @IsNotEmpty()
    end_hour:string;

    @IsNotEmpty()
    @MinLength(4)
    week_day:string;
}
