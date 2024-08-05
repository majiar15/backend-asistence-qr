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
                "_id" : item._id,
                "name" : item.name,
                "surnames" : item.surnames,
                "dni" : item.dni,
                "phone" : item.phone,
                "academic_program" : item.academic_program,
                "email" : item.email,
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