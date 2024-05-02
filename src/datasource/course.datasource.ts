import { Document, Model } from "mongoose";
import { Courses, CoursesDocument } from "./models/course.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCourseDto } from "@core/courses/dto/create-course.dto";
import { Schedule, ScheduleDocument } from "./models/schedule.model";


export class CoursesDataSource {
    constructor(
        @InjectModel(Courses.name)
        private readonly courses: Model<CoursesDocument>,
        @InjectModel(Schedule.name)
        private schedule: Model<ScheduleDocument>
    ) {}

    async saveCourse(course: Omit<CreateCourseDto, "schedules">): Promise<Document<Courses>>{
        return await this.courses.create(course);
    }

    async getCourses(course: Omit<CreateCourseDto, "schedules">){
        return await this.courses.findOne(course);
    }

    async getAllCourses(): Promise<Courses[]>{
        return await this.courses.find().populate('schedule','',this.schedule);
    }
}