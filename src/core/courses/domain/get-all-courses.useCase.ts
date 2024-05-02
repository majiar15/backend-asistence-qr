import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses } from "@datasource/models/course.model";
import { ScheduleDataSource } from "@datasource/schedule.datasource";
import { Types, Document } from "mongoose";


export class GetAllCoursesUseCase {

    coursesDb:Courses[];

    response: { status: boolean; data: Document<unknown, {}, any> & any & { _id: Types.ObjectId; }; }

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
        //const data=await this.coursesDataSource.getAllCourses();
        //console.log("🚀 ~ GetAllCoursesUseCase ~ getAllCourses ~ data:", data)
        //this.coursesDb=data;
        //this.courses=this.courses.
        //const schedule=await this.scheduleDataSource.getSchedule(course._id)
        //console.log("🚀 ~ GetAllCoursesUseCase ~ getAllCourses ~ schedule:", schedule)
        //console.log("🚀 ~ GET ALL COURSES ~ data:",  this.coursesDb)
        //this.response = {status:true,data: data}
        
    }
    async getSchedule(){
       
    }
}