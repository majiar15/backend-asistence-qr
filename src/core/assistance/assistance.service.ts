import { Injectable } from '@nestjs/common';
import { TakeAssistanceUseCase } from './domain/take_assistance.useCase';
import { AssistanceDataSource } from '@datasource/assistance.datasource';
import { TakeAssistanceDTO } from './dto/take-assistance.dto';
import {  LastAssistanceUseCase } from './domain/last_assistance.useCase';
import { GetByDateAssistanceUseCase } from './domain/get_by_date.useCase';
import { TakeAssistanceStudentUseCase } from './domain/take_assistance_student.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { AssistanceTeacherDataSource } from '@datasource/assistance_teacher.datasource';

@Injectable()
export class AssistanceService {

  constructor(
    private readonly assistance: AssistanceDataSource,
    private readonly course: CoursesDataSource,
    private readonly assistanceTeacher: AssistanceTeacherDataSource,
  ) { }



  take(body: TakeAssistanceDTO) {
    try {

      const takeAssistanceUseCase = new TakeAssistanceUseCase(
        this.assistance,
        this.course,
        this.assistanceTeacher

      )
      
      const data = takeAssistanceUseCase.main(body.courseId, body.studentId);

      return data
    } catch (error) {
      throw error;
    }
  }
  takeStudent(body: TakeAssistanceDTO) {
    try {

      const takeAssistanceStudentUseCase = new TakeAssistanceStudentUseCase(
        this.assistance,
        this.course,
        this.assistanceTeacher
      )
      
      const data = takeAssistanceStudentUseCase.main(body.courseId, body.studentId);

      return data
    } catch (error) {
      throw error;
    }
  }

  lastAssistance(courseId: string) {
    try {

      const lastAssistanceUseCase = new LastAssistanceUseCase(this.assistance);

      const data = lastAssistanceUseCase.main(courseId);

      return data
    } catch (error) {
      throw error;
    }
  }

  getByDate(date:string, courseId: string) {
    try {
      const getByDateAssistanceUseCase = new GetByDateAssistanceUseCase(this.assistance);
      const dateFormat = new Date(date);

      const data = getByDateAssistanceUseCase.main(dateFormat, courseId);

      return data
    } catch (error) {
      throw error;
    }
  }



}
