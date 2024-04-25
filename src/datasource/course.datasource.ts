import { Document, Model } from "mongoose";
import { Courses, CoursesDocument } from "./models/course.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCourseDto } from "@core/courses/dto/create-course.dto";


export class CoursesDataSource {
    constructor(
        @InjectModel(Courses.name)
        private readonly courses: Model<CoursesDocument>,
    ) {}

    async saveCourse(course: Omit<CreateCourseDto, "schedules">): Promise<Document<Courses>>{
        return await this.courses.create(course);
    }
    async getCourses(course: Omit<CreateCourseDto, "schedules">){
        return await this.courses.findOne(course);
    }
}