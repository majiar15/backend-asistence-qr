import { Controller, Get, Post, Body, Param, Delete, Put, Query, BadRequestException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/utils/rol.enum';
import { Payload } from '@common/decorators/payload.decorator';
import { IPayload } from '@common/interfaces/payload.interface';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';
import { ResponseDto } from '@common/utils/pagination/dto/paginated.dto';
import { CoursesDocument } from '@datasource/models/course.model';
import { SearchQueryParamsDto } from './dto/search-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Teacher)
  findAll(@Payload() payload: IPayload,@Query() query:PaginationQueryParamsDto):Promise<ResponseDto<CoursesDocument>> {
    if (payload.role === Role.Teacher) {
      return this.coursesService.getCoursesTeacher(payload.id,query);
    }

    return this.coursesService.findAll(query);
  }

  

  @Get('search')
  search(@Query() query:SearchQueryParamsDto) {
    
    if (query.name) {
      // Lógica para buscar por nombre
      return this.coursesService.findCoursesByName(query);
    } else if (query.id) {
      // Lógica para buscar por ID
      return this.coursesService.findOne(query.id);
    } else {
      // Manejo de caso donde no se proporciona ni name ni id
      throw new BadRequestException('Por favor, proporciona un nombre o un ID para buscar el curso.')
    }
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
  @Get('in-progress')
  @Roles(Role.Teacher)
  progressCourse() {
    return this.coursesService.progressCourse();
  }
  @Get('schedule-by/student/:id')
  @Roles(Role.Student)
  getScheduleByStudent(@Param('id') id: string) {
    return this.coursesService.getSchedule(id);
  }

}
