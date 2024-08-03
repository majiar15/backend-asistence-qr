import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { EnrollStudentsUseCase } from './domain/enroll-students.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { StudentDataSource } from '@datasource/student.datasource';
import { GetStudentEnrolled } from './domain/get-students-enroll.useCase';
import { UploadFileUseCase } from './domain/upload-file.useCase';
import { AcademicProgramDataSource } from '@datasource/academic_program.datasource';

@Injectable()
export class EnrollService {

  constructor(
    private readonly courseModel:CoursesDataSource,
    private readonly studentModel:StudentDataSource,
    private readonly acadmicProgramModel:AcademicProgramDataSource,
  
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

  uploadFile(file: Express.Multer.File,course_id: string){
   
    try {

      const getStudentEnrolled = new UploadFileUseCase(
        this.acadmicProgramModel,this.courseModel,this.studentModel
      );

      const data = getStudentEnrolled.main(file,course_id);

      return data
    } catch (error) {
      throw error;
    }
  }

  
}
