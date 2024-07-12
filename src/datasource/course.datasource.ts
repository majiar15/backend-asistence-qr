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
        return await this.courses.findOne(course).select('-students_ids');
    }

    async getCoursesByName(name:string,page?: number, limit?: number):Promise<CoursesDocument[]>{
        return await this.courses.find({name:new RegExp(name, 'i'),delete: false })
        .populate(['schedules_ids','teacher_id']) // Nombre del campo de referencia en el modelo Course
        .select('-students_ids')
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }
    async getCoursesByNameCount(name:string){
        return await this.courses.countDocuments({name:new RegExp(name, 'i'), delete: false });
    }

    async getCourseById(id:string):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false }).populate(['schedules_ids','teacher_id']).select('-students_ids');
    }


    async getCourseByIdIncludeStudents(id:string):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false }).populate(['schedules_ids','teacher_id']);
    }

    async getCourseWithEnrolledStudents(id:string,page?: number, limit?: number):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false }).populate({
            path: 'students_ids',
            select: '-password',
            populate: { path: 'academic_program' },
            options:{limit,skip:(page -1) * limit}
          }).lean().exec()
    }

    async getCourseWithEnrolledStudentsCount(id:string):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false }).exec()
    }

    async getCourseCount(){
        return await this.courses.countDocuments({ delete: false });
    }

    async getAllCourses(page: number, limit: number):Promise<CoursesDocument[]>{
        return await this.courses
        .find({delete: false })
        .populate('schedules_ids')
        .select('-students_ids') // Nombre del campo de referencia en el modelo Course
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }
    async updateCourses(id:string,data:any): Promise<Courses[]>{
        return await this.courses.findByIdAndUpdate(id,data,{ new: true })
    }

    async getCoursesByTeacher(teacherId: string,page: number, limit: number ){
        return await this.courses.find({ teacher_id: teacherId,delete: false }, "_id, name")
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }

    async getCoursesByTeacherCount(teacherId: string ){
        return await this.courses.find({ teacher_id: teacherId,delete: false }, "_id, name")
        .countDocuments({delete:false})
    }
}