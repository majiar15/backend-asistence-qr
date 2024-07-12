import { Model } from "mongoose";
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

    async saveCourse(course: Omit<CreateCourseDto, "schedules">):Promise<CoursesDocument>{
        return await this.courses.create(course);
    }

    async getCourses(course: Omit<CreateCourseDto, "schedules">):Promise<CoursesDocument>{
        return await this.courses.findOne(course).select('-students_ids');
    }

    async getCoursesByName(name:string):Promise<CoursesDocument[]>{
        return await this.courses.find({name:new RegExp(name, 'i')})
        .populate(['schedules_ids','teacher_id']) // Nombre del campo de referencia en el modelo Course
        .select('-students_ids')
        .exec();
    }

    async getCourseById(id:string):Promise<CoursesDocument>{
        return await this.courses.findById(id).populate(['schedules_ids','teacher_id']).select('-students_ids');
    }


    async getCourseByIdIncludeStudents(id:string):Promise<CoursesDocument>{
        return await this.courses.findById(id).populate(['schedules_ids','teacher_id']);
    }

    async getCourseWithEnrolledStudents(id:string,page?: number, limit?: number):Promise<CoursesDocument>{
        return await this.courses.findById(id).populate({
            path: 'students_ids',
            select: '-password',
            populate: { path: 'academic_program' },
            options:{limit,skip:(page -1) * limit}
          }).lean().exec()
    }

    async getCourseWithEnrolledStudentsCount(id:string):Promise<CoursesDocument>{
        return await this.courses.findById(id).exec()
    }

    async getCourseCount(){
        return await this.courses.countDocuments({ delete: false });
    }

    async getAllCourses(){
        return await this.courses
        .find()
        .populate('schedules_ids')
        .select('-students_ids') // Nombre del campo de referencia en el modelo Course
        .exec();
    }
    async updateCourses(id:string,data:any): Promise<Courses[]>{
        return await this.courses.findByIdAndUpdate(id,data,{ new: true })
    }
}