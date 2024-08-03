import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";
import { CoursesDocument } from "@datasource/models/course.model";


export class GetStudentEnrolled {

    private course: CoursesDocument;
    private students;
    response: { status: boolean; data?: any }

    constructor(
        private coursesDataSource: CoursesDataSource,
    ) { }

    async main(course_id: string) {

        try {
            await this.getCourse(course_id)
            await this.populatedStudents();
            await this.formatStudents();

            return this.response;
        } catch (error) {
            throw error;
        }
    }
    async getCourse(course_id: string) {
        this.course = await this.coursesDataSource.getCourseByIdIncludeStudents(course_id);
        if (!this.course) {
            throw new NotFoundException('COURSE NOT FOUND');
        }
    }



    async populatedStudents() {
        this.students = (await this.coursesDataSource.getCourseStudentPopulate(this.course._id)).students;
    }
    async formatStudents() {
        const studentsFormat = this.students.map((item)=>{
            return {
                "_id" : item.student_id._id,
                "name" : item.student_id.name,
                "surnames" : item.student_id.surnames,
                "dni" : item.student_id.dni,
                "phone" : item.student_id.phone,
                "academic_program" : item.student_id.academic_program,
                "email" : item.student_id.email,
            }
        });
        this.response = {
            status: true,
            data: {
                students: studentsFormat ?? []
            }
        }
    }
}