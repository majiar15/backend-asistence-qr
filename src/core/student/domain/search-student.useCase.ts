import { StudentDataSource } from "@datasource/student.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";


export class SearchStudentUseCase {

    data: string;
    response: { status: boolean; data: any }

    constructor(
        private studentDataSource: StudentDataSource,
    ) { }


    async main(name: string) {

        try {
            await this.validateName(name);
            name = this.processString(name);
            await this.findStudentsByName(name);
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

    private async findStudentsByName(name: string) {

        const query = Number.parseInt(name) >= 0
      ? { dni: Number.parseInt(name) }
      : { $or: [
        { name: { $regex: name, $options: 'i' } },
        { surnames: { $regex: name, $options: 'i' } }
      ] };
        const students = await this.studentDataSource.getStudentByName(query);

        if (students.length === 0) {
            throw new NotFoundException(`No se encontraron estudiantes con el nombre: ${name}`);
        }
        this.response = { status: true, data: students }
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