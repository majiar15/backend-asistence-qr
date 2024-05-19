import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses } from "@datasource/models/course.model";
import { ScheduleDataSource } from "@datasource/schedule.datasource";
import { NotFoundException } from "@nestjs/common";


export class GetAllCoursesUseCase {

    coursesDb:Courses[];

    response: { status: boolean; data: any }

    constructor(private coursesDataSource: CoursesDataSource, private scheduleDataSource: ScheduleDataSource){}

    async main(){

        try {
            await this.getAllCourses()

            return this.response;
        } catch (error) {
            throw error;
        }


    }


    async getAllCourses(){
        const data=await this.coursesDataSource.getAllCourses();
        if(data.length){
            this.response = {
                status:true,
                data:data
            }
            return;
        }
        throw new NotFoundException('COURSES NOT FOUND');
        
    }

}