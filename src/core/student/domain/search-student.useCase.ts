import { StudentDataSource } from "@datasource/student.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";


export class SearchStudentUseCase {

    response: { status: boolean; data: any }

    constructor(
        private studentDataSource: StudentDataSource,
    ) { }


    async main(name: string) {

        try {
            await this.validateName(name);
            await this.findStudentsByName(name);
            return this.response;
            
        } catch (error) {
            throw error;
        }


    }
    private validateName(name: string) {

        if (!name.trim()) {
          throw new BadRequestException('El nombre no puede estar vacío.');
        }
      }

    private async findStudentsByName(name: string) {

            const students = await this.studentDataSource.getStudentByName(name);

            if (students.length === 0) {
                throw new NotFoundException(`No se encontraron estudiantes con el nombre: ${name}`);
            }
            this.response = { status: true, data: students }
    }

}