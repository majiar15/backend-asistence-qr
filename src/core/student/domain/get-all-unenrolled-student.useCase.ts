import { CoursesDataSource } from "@datasource/course.datasource";
import { StudentDataSource } from "@datasource/student.datasource";
import { StudentDocument } from "@datasource/models/student.model";
import { NotFoundException } from "@nestjs/common";
import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentQueryParamsDto } from "../dto/get-student-pagination.dto";

export class GetAllUnenrolledStudentsUseCase {

    private students: StudentDocument[];
    private enrollStudentsSet: Set<string>; // Use Set for faster lookup
    private unenrolledStudents: StudentDocument[];
    response: ResponseDto<StudentDocument>;

    constructor(
        private coursesDataSource: CoursesDataSource,
        private studentDataSource: StudentDataSource,
    ) { }

    async main(query: StudentQueryParamsDto): Promise<ResponseDto<StudentDocument>> {

        try {
            const {course_id, page,limit} = query
            await this.getAllStudents(page, limit);

            await this.getAllUnenrolledStudents(course_id)

            await this.findUnenrolledStudents(page, limit);

            return this.response;
           
        } catch (error) {
            throw error;
        }
    }

    private async getAllStudents(page: number, limit: number){
        this.students = await this.studentDataSource.getAllStudent(page,limit);

        if (!this.students) {
            throw new NotFoundException('COURSES NOT FOUND');
        }
    }

    private async getAllUnenrolledStudents(id: string) {

        const course = await this.coursesDataSource.getCourseWithEnrolledStudents(id);

        if (!course) {
            throw new NotFoundException('COURSES NOT FOUND');
        }
        
        this.enrollStudentsSet = new Set<string>(course.students_ids.map((item: any) => item._id.toHexString()));
        
    }


    private async findUnenrolledStudents(page: number, limit: number) {
        this.unenrolledStudents = this.students.filter(student =>
            !this.enrollStudentsSet.has(student._id.toHexString())
        );

        const itemCount = await this.studentDataSource.getStudentsCount();
        this.response= new ResponseDto<StudentDocument>(true,this.unenrolledStudents, page, limit, itemCount)
    }
}