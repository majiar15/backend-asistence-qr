import { CoursesDataSource } from "@datasource/course.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { SearchQueryParamsDto } from "../dto/search-course.dto";
import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { CoursesDocument } from "@datasource/models/course.model";


export class SearchCoursesUseCase {

    response: ResponseDto<CoursesDocument>

    constructor(
        private coursesDataSource: CoursesDataSource,
    ) { }


    async main(query:SearchQueryParamsDto):Promise<ResponseDto<CoursesDocument>> {
        try {
            await this.validateName(query.name);
            await this.findCoursesByName(query);
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

    async findCoursesByName(query:SearchQueryParamsDto) {

        const {name,page,limit }= query;
        const courses = await this.coursesDataSource.getCoursesByName(name,page,limit);
        console.log("🚀 ~ SearchCoursesUseCase ~ findCoursesByName ~ courses:", courses)

        if (!courses) {
            throw new NotFoundException(`No se encontraron cursos con el nombre: ${name}`);
        }
        const itemCount = await this.coursesDataSource.getCoursesByNameCount(name);

        this.response= new ResponseDto<CoursesDocument>(true,courses, page, limit, itemCount)
    }

}