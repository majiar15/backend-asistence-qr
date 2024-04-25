import { CoursesDataSource } from "@datasource/course.datasource";
import { Courses } from "@datasource/models/course.model";
import { Document, Types } from "mongoose";
import { CreateCourseDto } from "../dto/create-course.dto";
import { ScheduleDataSource } from "@datasource/schedule.datasource";
import { BadRequestException } from "@nestjs/common";

export class CreateCoursesUseCase {

    course: Omit<CreateCourseDto, "schedules">;
    courseDb: Document<Courses>
    schedules: Array<any>;

    response: { status: boolean; data: Document<unknown, {}, any> & any & { _id: Types.ObjectId; }; }

    constructor(private coursesDataSource: CoursesDataSource, private scheduleDataSource: ScheduleDataSource) { }

    async main(courseObject: CreateCourseDto) {

        try {
            //Separa data de course y horarios
            this.subtractDataBody(courseObject);

            await this.getCourse()
            await this.saveCourse()

            this.addCourseIdASchedules();

            await this.saveSchedule();
        } catch (error) {
            throw error;
        }

        return this.response;
    }


    private subtractDataBody(courseObject: CreateCourseDto) {
        const { schedules, ...courseData } = courseObject;
        this.schedules = schedules;
        this.course = courseData;

    }

    async getCourse() {
        const coourse = await this.coursesDataSource.getCourses(this.course)
        if(coourse){
            throw new BadRequestException("Ya existe el curso a crear")
        }
    }
    async saveCourse() {
        const data = await this.coursesDataSource.saveCourse(this.course)
        this.courseDb = data;
        console.log("🚀 ~ GUARDAR CURSO:", data)
    }

    addCourseIdASchedules() {
        this.schedules.forEach(schedule => {
            schedule.course_id = this.courseDb._id;
        });
    }

    async saveSchedule() {
        console.log("🚀 ~ Schedules:", this.schedules)
        const data = await this.scheduleDataSource.saveSchedule(this.schedules)

       const updatedCourse = {
            _id: this.courseDb._id,
            ...this.course,
            schedules: data
        };
        console.log("🚀 ~ GUARDAR HORARIOS:", updatedCourse)
        this.response ={status:true,data:updatedCourse};
    }
}