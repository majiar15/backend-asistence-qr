import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";
import { CoursesDocument } from "@datasource/models/course.model";


export class GetEnrolledStudentsUseCase {

    private course: CoursesDocument;
    response: { status: boolean; data?: any }

    constructor(
        private coursesDataSource: CoursesDataSource,
    ) { }

    async main(id: string) {

        try {
            await this.getEnrolledStudentsByCourse(id)

            return this.response;
        } catch (error) {
            throw error;
        }
    }
    async getEnrolledStudentsByCourse(id: string) {

        const course = await this.coursesDataSource.getCourseWithEnrolledStudents(id);


        if (!course) {
            throw new NotFoundException('COURSES NOT FOUND');
        }

        const studentsWithCourseId = course.students_ids.map((student) => ({
            ...student,
            course_id: id,
        }))

        this.response = {
            status: true,
            data: studentsWithCourseId,
        };
    }

}