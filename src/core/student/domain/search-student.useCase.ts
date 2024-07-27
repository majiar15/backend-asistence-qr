import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentDocument } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { StudentQueryParamsDto } from "../dto/get-student-pagination.dto";
import { CoursesDocument } from "@datasource/models/course.model";


export class SearchStudentUseCase {

    name: string;
    response: ResponseDto<StudentDocument>;
    private course: CoursesDocument
    constructor(
        private studentDataSource: StudentDataSource,
    ) { }


    async main(query: StudentQueryParamsDto): Promise<ResponseDto<StudentDocument>> {

        try {
            const { page, limit } = query;
            this.name = query.name;
            await this.validateName();

            await this.findStudentsByName(page, limit);
            return this.response;

        } catch (error) {
            throw error;
        }


    }


    private validateName() {
        if (!this.name.trim()) {
            throw new BadRequestException('El nombre no puede estar vacío.');
        }
    }

    private async findStudentsByName(page: number, limit: number) {

        const query = {
            delete: false,
            $or: [
                { name: { $regex: this.name, $options: 'i' } },
                { surnames: { $regex: this.name, $options: 'i' } }
            ]
        };
        const students = await this.studentDataSource.getStudentByName(query, page, limit);

        if (!students) {
            throw new NotFoundException(`No se encontraron estudiantes con el nombre: ${name}`);
        }

        const itemCount = await this.studentDataSource.getStudentByNameCount(query);
        this.response = new ResponseDto<StudentDocument>(true, students, page, limit, itemCount)
    }
}