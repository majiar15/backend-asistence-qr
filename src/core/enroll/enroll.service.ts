import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { EnrollStudentsUseCase } from './domain/enroll-students.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { StudentDataSource } from '@datasource/student.datasource';
import { GetStudentEnrolled } from './domain/get-students-enroll.useCase';

@Injectable()
export class EnrollService {

  constructor(
    private readonly courseModel:CoursesDataSource,
    private readonly studentModel:StudentDataSource,
  
  ){}

  create(createEnrollDto: CreateEnrollDto) {
    try {
      const enrollUseCase = new EnrollStudentsUseCase(this.courseModel)
      const data = enrollUseCase.main(createEnrollDto);
      return data
    } catch (error) {
      throw error;
    }
  }

  getStudentEnrolled(courseId: string) {
    try {

      const getStudentEnrolled = new GetStudentEnrolled(this.courseModel);

      const data = getStudentEnrolled.main(courseId);

      return data
    } catch (error) {
      throw error;
    }
  }


}
