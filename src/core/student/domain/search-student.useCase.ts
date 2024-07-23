import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentDocument } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { StudentQueryParamsDto } from "../dto/get-student-pagination.dto";
import { CoursesDataSource } from "@datasource/course.datasource";
import { CoursesDocument } from "@datasource/models/course.model";


export class SearchStudentUseCase {

    data: string;
    response: ResponseDto<StudentDocument>;
    private course:CoursesDocument
    constructor(
        private studentDataSource: StudentDataSource,
        private coursesDataSource: CoursesDataSource,
    ) { }


    async main(query: StudentQueryParamsDto):Promise<ResponseDto<StudentDocument>> {

        try {
            const { page, limit } = query;
            let name = query.name;
            await this.validateName(name);
            name = this.processString(name);
            await this.findStudentsByName(name, page, limit);
            return this.response;

        } catch (error) {
            throw error;
        }


    }

    async getCourse(course_id:string) {
        this.course = await this.coursesDataSource.getCourseById(course_id);
        if (!this.course) {
            throw new NotFoundException('COURSES NOT FOUND');
        }
    }


    private validateName(name: string) {
        this.data = name;
        if (!this.data.trim()) {
            throw new BadRequestException('El nombre no puede estar vacío.');
        }
    }

    private async findStudentsByName(name: string, page: number, limit: number) {

        const query = Number.parseInt(name) >= 0
            ? { dni: Number.parseInt(name) }
            : {
                delete: false,
                academic_program: { $in: this.course.academic_programs },
                $or: [
                    { name: { $regex: name, $options: 'i' } },
                    { surnames: { $regex: name, $options: 'i' } }
                ]
            };
        const students = await this.studentDataSource.getStudentByName(query, page, limit);

        if (!students) {
            throw new NotFoundException(`No se encontraron estudiantes con el nombre: ${name}`);
        }

        const itemCount = await this.studentDataSource.getStudentByNameCount(query);
        this.response = new ResponseDto<StudentDocument>(true, students, page, limit, itemCount)
    }

    private processString(input) {

        const isNumberWithDots = /^\d+(\.\d+)*$/.test(input);

        if (isNumberWithDots) {

            const numberWithoutDots = input.replace(/\./g, '');
            return numberWithoutDots;
        } else {

            return input;
        }
    }
}