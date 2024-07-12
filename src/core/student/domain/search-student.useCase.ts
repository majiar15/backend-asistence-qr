import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentDocument } from "@datasource/models/student.model";
import { StudentDataSource } from "@datasource/student.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { StudentQueryParamsDto } from "../dto/get-student-pagination.dto";


export class SearchStudentUseCase {

    data: string;
    response: ResponseDto<StudentDocument>;

    constructor(
        private studentDataSource: StudentDataSource,
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