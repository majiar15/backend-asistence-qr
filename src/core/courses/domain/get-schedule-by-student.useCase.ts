import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";



export class GetScheduleByStudentUseCase{

    response: { status: boolean; data: any }
    courses: any[] = [];
    sortSchedules;
    constructor(
        private coursesDataSource: CoursesDataSource,
    ){}

    async main(student_id: string){

        try {
            await this.getCoursesByStudent(student_id);
            this.filterCourseActive();
            this.SortScheduleByDays();
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async getCoursesByStudent(student_id: string){
        const course = await this.coursesDataSource.getCoursesByStudent(student_id);
        if(course){
            this.courses = course;
            return;
        }
        throw new NotFoundException('COURSES NOT FOUND');

    }
    filterCourseActive(){
        this.courses = this.courses.filter((course)=>{
            return this.isCourseActive(course);
        });
        if (this.courses.length === 0) {
            throw new NotFoundException('COURSES NOT AVAILABLE');
        }
    }
    isCourseActive(course:any) {
        const now = new Date();
        const startDate = new Date(course.date_start);
        const endDate = new Date(course.date_end);

        const isActive = now >= startDate && now <= endDate;

        return isActive;
    }
    SortScheduleByDays(){
        const organized = {};
        
        this.courses.forEach(course => {
            course.schedules.forEach(schedule => {
            if (!organized[schedule.week_day]) {
                organized[schedule.week_day] = [];
            }
        
            organized[schedule.week_day].push({
                hour_start: schedule.hour_start,
                hour_end: schedule.hour_end,
                name: course.name,
            });
            });
        });
        
        Object.keys(organized).forEach(day => {
            organized[day].sort((a, b) => b.hour_start.localeCompare(a.hour_start));
        });
        
        this.sortSchedules = Object.keys(organized).map(day => ({
            day,
            schedules: organized[day],
        }));
        this.response = {
            status: true,
            data: this.sortSchedules
        }
    }


}