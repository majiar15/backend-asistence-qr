import { Controller, Get, Post, Body, Param, Delete, Put, Query, BadRequestException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/utils/rol.enum';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.coursesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  @Get('search')
  search(@Query('name') name?: string, @Query('id') id?: string) {
    console.log("🚀 ~ CoursesController ~ search ~ id:", id)
    console.log("🚀 ~ CoursesController ~ search ~ name:", name)
    
    
    if (name) {
      // Lógica para buscar por nombre
      return this.coursesService.findCoursesByName(name);
    } else if (id) {
      // Lógica para buscar por ID
      return this.coursesService.findOne(id);
    } else {
      // Manejo de caso donde no se proporciona ni name ni id
      throw new BadRequestException('Por favor, proporciona un nombre o un ID para buscar el curso.')
    }
   
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
