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

@Injectable()
export class StudentService {

  constructor(private readonly studentModel: StudentDataSource) { }

  async create(createStudentDto: CreateStudentDto) {

    try {
      const studentUseCase = new CreateStudentUseCase(this.studentModel)
      const data = await studentUseCase.main(createStudentDto);
      return data;

    } catch (error) {
      throw error;
    }
  }

  async findAll() {

    try {
      const studentUseCase = new GetAllStudentUseCase(this.studentModel)
      const data = await studentUseCase.main();
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

  findCoursesByName(name: string) {
    
    try {

      const studentUseCase = new SearchStudentUseCase(this.studentModel)
      const data = studentUseCase.main(name);
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
}
