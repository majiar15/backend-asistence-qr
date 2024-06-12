import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { EnrollStudentsUseCase } from './domain/enroll-students.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';

@Injectable()
export class EnrollService {

  constructor(private readonly courseModel:CoursesDataSource){}

  create(createEnrollDto: CreateEnrollDto) {
    try {
      const enrollUseCase = new EnrollStudentsUseCase(this.courseModel)
      const data = enrollUseCase.main(createEnrollDto);
      return data
    } catch (error) {
      throw error;
    }
  }

}
