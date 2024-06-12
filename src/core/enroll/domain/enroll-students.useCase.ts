import { CoursesDataSource } from "@datasource/course.datasource";
import { CreateEnrollDto } from "../dto/create-enroll.dto";
import { NotFoundException } from "@nestjs/common";
import { Types } from "mongoose";
import { CoursesDocument } from "@datasource/models/course.model";


export class EnrollStudentsUseCase {

    private course:CoursesDocument;
    response: { status: boolean; data?: any }

    constructor(
        private coursesDataSource: CoursesDataSource,
    ) { }

    async main(enroll: CreateEnrollDto) {

        try {
            await this.getCourse(enroll)
            await this.enroll(enroll);

            return this.response;
        } catch (error) {
            throw error;
        }
    }
    async getCourse(enroll: CreateEnrollDto){
        this.course = await this.coursesDataSource.getCourseById(enroll.course_id);
        if (!this.course) {
            throw new NotFoundException('COURSES NOT FOUND');
        }
    }



    async enroll(enroll: CreateEnrollDto) {
        
        const studentIds = enroll.students.map(studentId => new Types.ObjectId(studentId));

       const newStudentIds = studentIds.filter(studentId => !this.course.students_ids.includes(studentId));
       console.log("🚀 ~ ~ this.course.students_ids:", this.course.students_ids)
       console.log("🚀 ~ ~ studentIds:", studentIds)

        this.course.students_ids = [...this.course.students_ids, ...newStudentIds];
        await this.course.save();
        this.response = {status:true}
      
    }
}