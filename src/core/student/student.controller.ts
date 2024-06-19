import { Controller, Get, Post, Body, Param, Delete, Put, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/utils/rol.enum';
import { Types } from 'mongoose';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.studentService.findAll();
  }
  
  @Get('search')
  search(@Query('name') name?: string, @Query('id') id?: string) {
    console.log("🚀 ~ StudentController ~ search ~ id:", id)
    console.log("🚀 ~ StudentController ~ search ~ search:",name)
    
    if (name) {
      // Lógica para buscar por nombre
      return this.studentService.findCoursesByName(name);
    } else if (id) {
      // Lógica para buscar por ID
      return this.studentService.findOne(id);
    } else {
      // Manejo de caso donde no se proporciona ni name ni id
      throw new BadRequestException('Por favor, proporciona un nombre o un ID para buscar el curso.')
    }
   
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  
  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
