
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

    getAllStudent(){
        return this.student.find({delete: false }).select('-password');
    }

    getStudent(dni){
        return this.student.findOne({dni,delete: false }).select('-password');;
    }

    getStudentById(id:string){
        return this.student.findById(id).select('-password');
    }

    updateStudent(id:string,data){
        return this.student.findByIdAndUpdate(id,data,{ new: true }) 
    }

    deleteStudent(id){
        return this.student.findByIdAndUpdate(id,{delete:true},{ new: true })
    }
}