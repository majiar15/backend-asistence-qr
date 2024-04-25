import { Model } from "mongoose";
import { Courses } from "./models/course.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCourseDto } from "@core/courses/dto/create-course.dto";


export class CoursesDataSource {
    constructor(
        @InjectModel(Courses.name) private courses: Model<Courses>,
    ) {}

    saveCourse(course: CreateCourseDto){
        return this.courses.create(course);
        
    }
}