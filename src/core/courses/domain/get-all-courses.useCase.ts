import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { PaginationQueryParamsDto } from "@common/utils/pagination/dto/pagination-query-params.dto";
import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses, CoursesDocument } from "@datasource/models/course.model";
import { ScheduleDataSource } from "@datasource/schedule.datasource";
import { NotFoundException } from "@nestjs/common";


export class GetAllCoursesUseCase {

    coursesDb:Courses[];

    response: ResponseDto<CoursesDocument>;

    constructor(private coursesDataSource: CoursesDataSource, private scheduleDataSource: ScheduleDataSource){}

    async main(query:PaginationQueryParamsDto): Promise<ResponseDto<CoursesDocument>>{

        try {
            await this.getAllCourses(query)

            return this.response;
        } catch (error) {
            throw error;
        }


    }


    async getAllCourses(query:PaginationQueryParamsDto){

        const {page,limit} = query;
        const data=await this.coursesDataSource.getAllCourses(page,limit);
        if(!data){
            
            throw new NotFoundException('COURSES NOT FOUND');
        }
        
        const itemCount = await this.coursesDataSource.getCourseCount();
        this.response= new ResponseDto<CoursesDocument>(true,data, page, limit, itemCount)
    }

}