import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query, BadRequestException } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { RolesGuard } from '@common/guards/roles/roles.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/utils/rol.enum';
import { ResponseDto } from '@common/utils/pagination/dto/paginated.dto';
import { Users } from '@datasource/models/user.model';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';
import { TeacherQueryParamsDto } from './dto/get-teacher-pagination.dto';


@Controller('teachers')
@UseGuards(RolesGuard)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @Roles(Role.Admin)
  getAllTeachers(@Query() query:PaginationQueryParamsDto):Promise<ResponseDto<Users>> {
    return this.teacherService.getAllTeachers(query);
  }

  //NO SE PARA QUE CREARON ESTA API
  @Get('search')
  @Roles(Role.Admin)
  search(@Query() query:TeacherQueryParamsDto):Promise<ResponseDto<Users>> {
  
    if (query.name) {
      // Lógica para buscar por nombre
      return this.teacherService.search(query);
    } else if (query.id) {
      // Lógica para buscar por ID
      return this.teacherService.findOneTeacher(query.id);
    } else {
      // Manejo de caso donde no se proporciona ni name ni id
      throw new BadRequestException('Por favor, proporciona un nombre o un ID para buscar el curso.')
    }
  }

  @Get(':id')
  findOneTeacher(@Param('id') id: string) {
    return this.teacherService.findOneTeacher(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }

  

}
