import { Model } from "mongoose";
import { Courses, CoursesDocument } from "./models/course.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCourseDto } from "@core/courses/dto/create-course.dto";
import { Schedule, ScheduleDocument } from "./models/schedule.model";
import { getDateUTC } from "@common/utils/getDateUTC";
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
        return await this.courses.findOne(course).select('-students -delete');
    }

    async getCoursesByName(name:string,page?: number, limit?: number):Promise<CoursesDocument[]>{
        return await this.courses.find({name:new RegExp(name, 'i'),delete: false })
        .populate(['schedules','teacher_id']) // Nombre del campo de referencia en el modelo Course
        .select('-students -delete')
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }
    async getCourseStudentPopulate(_id:string): Promise<CoursesDocument>{
        return await this.courses.findOne({_id,delete: false })
        .populate(['schedules','teacher_id', 'students'])
        .populate({
            path: 'students',
            populate: {
              path: 'academic_program',
              model: 'AcademicProgram'
            }
          })
        .select('-delete')
        .exec();
    }
    async getCoursesByNameCount(name:string){
        return await this.courses.countDocuments({name:new RegExp(name, 'i'), delete: false });
    }

    async getCourseById(id:string):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false })
        .populate(['schedules','teacher_id'])
        .select('-students -delete');
    }


    async getCourseByIdIncludeStudents(id:string):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false })
        .populate(['schedules','teacher_id'])
        .select('-delete')
        ;
    }

    async getCourseWithEnrolledStudents(id:string,page?: number, limit?: number):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false }).populate({
            path: 'students',
            select: '-password',
            populate: { path: 'academic_program' },
            options:{limit,skip:(page -1) * limit}
          }).lean()
          .select('-delete')
          .exec()
    }

    async getCourseWithEnrolledStudentsCount(id:string):Promise<CoursesDocument>{
        return await this.courses.findOne({_id:id, delete: false }).select('-delete').exec()
    }

    async getCourseCount(){
        return await this.courses.countDocuments({ delete: false });
    }

    async getAllCourses(page: number, limit: number):Promise<CoursesDocument[]>{
        return await this.courses
        .find({delete: false })
        .populate('schedules')
        .select('-students -delete') // Nombre del campo de referencia en el modelo Course
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }
    async updateCourses(id:string,data:any): Promise<Courses[]>{
        return await this.courses.findByIdAndUpdate(id,data,{ new: true })
    }

    async getCoursesByTeacher(teacherId: string,page: number, limit: number ){
        const date = getDateUTC();
        return await this.courses.find({
            teacher_id: teacherId,
            date_start: {
                $lte: date
            },
            date_end:{
                $gte: date,
            },
            delete: false
        }, "_id, name")
        .select('-delete')
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }
    async getCoursesByStudent(studentId: string){
        return await this.courses.find({ students: studentId })
        .populate('schedules')
        .select('-delete')
        .exec();
    }

    async getCoursesByTeacherCount(teacherId: string ){
        return await this.courses.find({ teacher_id: teacherId,delete: false }, "_id, name")
        .countDocuments({delete:false})
    }

    deleteCourse(id:string){
        return this.courses.findByIdAndUpdate(id,{delete:true},{ new: true })
    }
}