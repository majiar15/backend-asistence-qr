import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";

export class GetScheduleByCourseUseCase {

    response: { status: boolean; data: any }
    course: any;
    sortSchedules;
    constructor(
        private coursesDataSource: CoursesDataSource,
    ){}

    async main(course_id: string){

        try {
            await this.getCourseById(course_id);
            this.filterCourseActive();

            this.response = {
                status: true,
                data: this.course.schedules
            }
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async getCourseById(course_id: string){
        const course = await this.coursesDataSource.getCourseById(course_id);
        if(course){
            this.course = course;
            return;
        }
        throw new NotFoundException('COURSE NOT FOUND');

    }

    filterCourseActive(){
        if (!this.isCourseActive(this.course)) {
            throw new NotFoundException('COURSE NOT AVAILABLE');
        }
    }

    isCourseActive(course:any) {
        const now = new Date();
        const startDate = new Date(course.date_start);
        const endDate = new Date(course.date_end);

        const isActive = now >= startDate && now <= endDate;



        return isActive;
    }
}
