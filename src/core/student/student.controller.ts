import { Controller, Get, Post, Body, Param, Delete, Put, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { Role } from '@common/utils/rol.enum';
import { ValidateObjectIdPipe } from '@common/pipes/validate-object-id.pipe';
import { StudentQueryParamsDto } from './dto/get-student-pagination.dto';
import { ResponseDto } from '@common/utils/pagination/dto/paginated.dto';
import { StudentDocument } from '@datasource/models/student.model';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';


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
  findAll(@Query() query:PaginationQueryParamsDto): Promise<ResponseDto<StudentDocument>> {
    return this.studentService.findAll(query);
  }
  
  @Get('search-not-enrolled')
  search(@Query()query: StudentQueryParamsDto) {

    if (query.name) {
      // Lógica para buscar por nombre
      return this.studentService.findStudentByName(query);
    } else if (query.id) {
      // Lógica para buscar por ID
      return this.studentService.findOne(query.id);
    } else {
      // Manejo de caso donde no se proporciona ni name ni id
      throw new BadRequestException('Por favor, proporciona un nombre o un ID para buscar el curso.')
    }
   
  }

  @Get('not-enrolled')
  getAllUnenrolledStudents(@Query(ValidateObjectIdPipe) query: StudentQueryParamsDto): Promise<ResponseDto<StudentDocument>>{

    return this.studentService.getAllUnenrolledStudents(query)
  }

  @Get('enrolled')
  getEnrolledStudents(@Query(ValidateObjectIdPipe) query: StudentQueryParamsDto): Promise<ResponseDto<StudentDocument>>{
  
    return this.studentService.getEnrolledStudents(query)
  }

  @Get(':id')
  async findOne(@Param('id',ValidateObjectIdPipe) id: string) {
   
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
