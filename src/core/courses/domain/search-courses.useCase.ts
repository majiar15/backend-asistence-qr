import { CoursesDataSource } from "@datasource/course.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";


export class SearchCoursesUseCase {

    response: { status: boolean; data: any }

    constructor(
        private coursesDataSource: CoursesDataSource,
    ) { }


    async main(name: string) {
        try {
            await this.validateName(name);
            await this.findCoursesByName(name);
            return this.response;
        } catch (error) {
            throw error;
        }


    }
    validateName(name: string) {
        if (!name.trim()) {
          throw new BadRequestException('El nombre no puede estar vacío.');
        }
      }

    async findCoursesByName(name: string) {
        const courses = await this.coursesDataSource.getCoursesByName(name);
        console.log("🚀 ~ SearchCoursesUseCase ~ findCoursesByName ~ courses:", courses)

        if (courses.length === 0) {
            throw new NotFoundException(`No se encontraron cursos con el nombre: ${name}`);
        }
        this.response = { status: true, data: courses }
    }

}