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
            await this.getCoursesByTeacher(teacherId,query)
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    private async getCoursesByTeacher(teacherId:string,query:PaginationQueryParamsDto){

        const {page,limit} = query;
        this.courses = await this.coursesDataSource.getCoursesByTeacher(teacherId,page,limit);
        if(!this.courses){

            throw new NotFoundException('El curso no se encuentra registrado.');
        }
        const itemCount = await this.coursesDataSource.getCoursesByTeacherCount(teacherId);

        this.response= new ResponseDto<CoursesDocument>(true,this.courses, page, limit, itemCount)
    }

}