import { CoursesDataSource } from "@datasource/course.datasource";
import { NotFoundException } from "@nestjs/common";
import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentDocument } from "@datasource/models/student.model";
import { StudentQueryParamsDto } from "../dto/get-student-pagination.dto";


export class GetEnrolledStudentsUseCase {

    response: ResponseDto<StudentDocument>;

    constructor(
        private coursesDataSource: CoursesDataSource,
    ) { }

    async main(query: StudentQueryParamsDto): Promise<ResponseDto<StudentDocument>> {

        try {
            const { course_id, page, limit } = query;

            await this.getEnrolledStudentsByCourse(course_id, page, limit)

            return this.response;
        } catch (error) {
            throw error;
        }
    }
    private async getEnrolledStudentsByCourse(id: string, page: number, limit: number) {

        const course = await this.coursesDataSource.getCourseWithEnrolledStudents(id, page, limit);

        if (!course) {
            throw new NotFoundException('No se encontró el curso solicitado.');
        }

        const studentsWithCourseId = course.students.map((student) => ({
            ...student,
            course_id: id,
        }))

        const itemCount = await this.coursesDataSource.getCourseWithEnrolledStudentsCount(id);
        this.response = new ResponseDto<any>(true, studentsWithCourseId, page, limit, itemCount.students.length)
    }

}