import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/utils/rol.enum';
import { Payload } from '@common/decorators/payload.decorator';
import { IPayload } from '@common/interfaces/payload.interface';

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
  findAll(@Payload() payload: IPayload) {
    if (payload.role === Role.Teacher) {
      return this.coursesService.getCoursesTeacher(payload.id);
    }

    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
