import { Model } from "mongoose";
import { Courses, CoursesDocument } from "./models/course.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCourseDto } from "@core/courses/dto/create-course.dto";
import { Schedule, ScheduleDocument } from "./models/schedule.model";
// import { formatDate } from "@common/utils/formatDate";

export class CoursesDataSource {
    constructor(
        @InjectModel(Courses.name)
        private readonly courses: Model<CoursesDocument>,
        @InjectModel(Schedule.name)
        private schedule: Model<ScheduleDocument>
    ) {}

    async saveCourse(course: Omit<CreateCourseDto, "schedules">):Promise<CoursesDocument>{
        console.log(course);
        return await this.courses.create(course);
    }

    async getCourses(course: Omit<CreateCourseDto, "schedules">):Promise<CoursesDocument>{
        return await this.courses.findOne(course);
    }

    async getCourseById(id:string):Promise<CoursesDocument>{
        return await this.courses.findById(id);
    }

    async getAllCourses(){
        return await this.courses
        .find()
        .populate('schedules_ids') // Nombre del campo de referencia en el modelo Course
        .exec();
    }
    async updateCourses(id:string,data:any): Promise<Courses[]>{
        return await this.courses.findByIdAndUpdate(id,data,{ new: true }) 
    }

    async getCoursesByTeacher(teacherId: string ){
        console.log({ teacher_id: teacherId});
        return await this.courses.find({ teacher_id: teacherId}, "_id, name")
    }
}