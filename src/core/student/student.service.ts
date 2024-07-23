import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentDataSource } from '@datasource/student.datasource';
import { CreateStudentUseCase } from './domain/create-student.useCase';
import { GetAllStudentUseCase } from './domain/get-all-student.useCase';
import { GetOneStudentUseCase } from './domain/get-one-student.useCase';
import { UpdateStudentUseCase } from './domain/update-student.useCase copy';
import { DeleteStudentUseCase } from './domain/delete-student.useCase';
import { SearchStudentUseCase } from './domain/search-student.useCase';
import { GetEnrolledStudentsUseCase } from './domain/get-enrolled-students.useCase';
import { GetAllUnenrolledStudentsUseCase } from './domain/get-all-unenrolled-student.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { ResponseDto } from '@common/utils/pagination/dto/paginated.dto';
import { StudentDocument } from '@datasource/models/student.model';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';
import { StudentQueryParamsDto } from './dto/get-student-pagination.dto';
@Injectable()
export class StudentService {

  constructor(
    private readonly studentModel: StudentDataSource,
    private readonly courseModel: CoursesDataSource
  ) { }

  async create(createStudentDto: CreateStudentDto) {

    try {
      const studentUseCase = new CreateStudentUseCase(this.studentModel)
      const data = await studentUseCase.main(createStudentDto);
      return data;

    } catch (error) {
      throw error;
    }
  }

  async findAll(query:PaginationQueryParamsDto) {

    try {
      const studentUseCase = new GetAllStudentUseCase(this.studentModel)
      const data = await studentUseCase.main(query);
      return data;

    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {


    try {
      const studentUseCase = new GetOneStudentUseCase(this.studentModel)
      const data = await studentUseCase.main(id);
      return data;

    } catch (error) {
      throw error;
    }

  }

  findStudentByName(query: StudentQueryParamsDto) {
    
    try {

      const studentUseCase = new SearchStudentUseCase(this.studentModel,this.courseModel)
      const data = studentUseCase.main(query);
      return data

    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {

    try {
      const studentUseCase = new UpdateStudentUseCase(this.studentModel)
      const data = await studentUseCase.main(id, updateStudentDto);
      return data;

    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {


    try {
      const studentUseCase = new DeleteStudentUseCase(this.studentModel)
      const data = await studentUseCase.main(id);
      return data;

    } catch (error) {
      throw error;
    }
  }


  async getEnrolledStudents(query: StudentQueryParamsDto):Promise<ResponseDto<StudentDocument>>{
    try {
      const enrollUseCase = new GetEnrolledStudentsUseCase(this.courseModel)
      const data = await enrollUseCase.main(query);
      return data
    } catch (error) {
      throw error;
    }
  }

  async getAllUnenrolledStudents(query: StudentQueryParamsDto): Promise<ResponseDto<StudentDocument>>{
    try {
      const enrollUseCase = new GetAllUnenrolledStudentsUseCase(this.courseModel,this.studentModel)
      const data = await enrollUseCase.main(query);
      return data
    } catch (error) {
      throw error;
    }
  }
}
