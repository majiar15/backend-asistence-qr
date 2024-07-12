import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { PaginationQueryParamsDto } from "@common/utils/pagination/dto/pagination-query-params.dto";
import { CoursesDataSource } from "@datasource/course.datasource";
import { CoursesDocument } from "@datasource/models/course.model";
import { NotFoundException } from "@nestjs/common";



export class getCoursesTeacherUseCase {

    private courses;
    private response: ResponseDto<CoursesDocument>;

    constructor(
        private coursesDataSource: CoursesDataSource, 
    ) { }

    async main(teacherId: string,query:PaginationQueryParamsDto) {

        try {
            this.getCoursesByTeacher(teacherId,query)
        } catch (error) {
            throw error;
        }

        return this.response;
    }

    private async getCoursesByTeacher(teacherId:string,query:PaginationQueryParamsDto){

        const {page,limit} = query;
        this.courses = await this.coursesDataSource.getCoursesByTeacher(teacherId,page,limit);
        if(!this.courses){
            
            throw new NotFoundException('COURSES NOT FOUND');
        }
        const itemCount = await this.coursesDataSource.getCoursesByTeacherCount('teacher');

        this.response= new ResponseDto<CoursesDocument>(true,this.courses, page, limit, itemCount)
    }

}