import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";



export class GetOneCourses{

    response: { status: boolean; data: any }

    constructor(
        private coursesDataSource: CoursesDataSource,
    ){}

    async main(id:string){

        try {
            await this.getCourseById(id);

            return this.response;
            
        } catch (error) {
            throw error;
        }

    }

    async getCourseById(id:string){
        const course = await this.coursesDataSource.getCourseById(id);
        if(course){
            this.response = {
                status:true,
                data:course
            }
            return;
        }
        throw new NotFoundException('COURSES NOT FOUND');

    }
}