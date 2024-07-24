import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";



export class InProgressCoursesUseCase{

    response: { status: boolean; data: any }
    courses: any[] = [];
    coursesInClass;
    constructor(
        private coursesDataSource: CoursesDataSource,
    ){}

    async main(){

        try {
            await this.getCourses();
            this.findCourseInClass();
            return this.response;
            
        } catch (error) {
            throw error;
        }

    }

    async getCourses(){
        const course = await this.coursesDataSource.getAllCourses(1,1000000000000);
        if(course){
            this.courses = course;
            return;
        }
        throw new NotFoundException('COURSES NOT FOUND');

    }
    findCourseInClass(){
        this.coursesInClass = this.courses.filter((course)=>{
            return this.isCourseActiveAndInClass(course);
        });
        console.log("coursesInClass", this.coursesInClass);
        this.response = {
            status: true,
            data: this.coursesInClass.length > 0 ? this.coursesInClass[0] : null
        }
    }
    isCourseActiveAndInClass(course:any) {
        const now = new Date();
        const startDate = new Date(course.date_start);
        const endDate = new Date(course.date_end);
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

        const isActive = now >= startDate && now <= endDate;
        const isInClass = course.schedules.some(schedule => {
            console.log("schedule.week_day", schedule.week_day);
            console.log("currentDay", currentDay);
            console.log("current day", schedule.week_day === currentDay);
            console.log("hour_start", currentTime >= schedule.hour_start );
            console.log("hour_end", currentTime <= schedule.hour_end);
            return schedule.week_day === currentDay &&
                currentTime >= schedule.hour_start &&
                currentTime <= schedule.hour_end;
        });
        console.log("isInClass",isInClass);
        return isActive && isInClass;
    }


}