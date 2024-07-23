
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Student, StudentDocument } from "./models/student.model";
import { CreateStudentDto } from "@core/student/dto/create-student.dto";


export class StudentDataSource {
    constructor(
        @InjectModel(Student.name) private student: Model<StudentDocument>,
    ) {}

    async saveStudent(student:CreateStudentDto){
        return await this.student.create(student)
    }

    getStudentByDni(dni: number){
        return this.student.findOne({ dni })
        .select('-delete');
    }

    getAllStudent(page: number, limit: number): Promise<StudentDocument[]>{
        return this.student.find({ delete: false })
        .populate(['academic_program'])
        .select('-password')
        .select('-delete')
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }
    getStudentsByProgram(academic_program:any[],page: number, limit: number): Promise<StudentDocument[]>{
        return this.student.find({
            academic_program: { $in: academic_program },
            delete: false 
        })
        .populate(['academic_program'])
        .select('-password -delete')
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }

    getStudent(dni){
        return this.student.findOne({dni,delete: false })
        .populate(['academic_program'])
        .select('-password')
        .select('-delete')
        .exec();
    }

    getStudentById(id:string){
        return this.student.findById(id,{delete:false}).populate(['academic_program'])
        .select('-password')
        .select('-delete')
        .exec();
        
    }

    getStudentsCount(){
        return this.student.countDocuments({ delete: false })
    }

    updateStudent(id:string,data){
        return this.student.findByIdAndUpdate(id,data,{ new: true })
        .select('-password')
        .select('-delete') 
    }

    deleteStudent(id:string){
        return this.student.findByIdAndUpdate(id,{delete:true},{ new: true })
    }

    async getStudentByName(query:any,page: number, limit: number):Promise<StudentDocument[]>{
        return this.student.find(query)
        .populate(['academic_program'])
        .select('-password')
        .limit(limit)
        .skip((page -1) * limit)
        .exec();
    }

    async getStudentByNameCount(query:any){
        return this.student.countDocuments(query).exec();
    }
}