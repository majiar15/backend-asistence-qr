import { IsInt, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class StudentQueryParamsDto {
    
    readonly course_id?: string;

    readonly name?: string;

   
    readonly id?: string;
    
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1; // Ahora es obligatorio y tiene valor predeterminado

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    readonly limit: number = 10;
}