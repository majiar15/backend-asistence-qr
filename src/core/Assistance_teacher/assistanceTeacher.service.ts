import { Injectable } from '@nestjs/common';
import { CreateAssistanceTeacherUseCase } from './domain/create_assistance_teacher.useCase';
import { CreateAssistanceDTO } from './dto/create-assistance-teacher.dto';

import { CoursesDataSource } from '@datasource/course.datasource';
import { AssistanceTeacherDataSource } from '@datasource/assistance_teacher.datasource';
import { GetTodayAssistanceTeacherUseCase } from './domain/get_today_assistance_teacher.useCase';

@Injectable()
export class AssistanceTeacherService {

  constructor(
    private readonly assistanceTeacher: AssistanceTeacherDataSource,
    private readonly course: CoursesDataSource,
  ) { }



  create(body: CreateAssistanceDTO, teacher_id: string) {
    try {

      const createAssistanceUseCase = new CreateAssistanceTeacherUseCase(
        this.assistanceTeacher,
        this.course
      )
      const data = createAssistanceUseCase.main(
        body.courseId,
        body.bitacora,
        body.secret,
        teacher_id
      );

      return data
    } catch (error) {
      throw error;
    }
  }

  getToday(courseId: string, teacher_id: string) {
    try {

      const getTodayAssistanceTeacherUseCase = new GetTodayAssistanceTeacherUseCase(
        this.assistanceTeacher
      )
      const data = getTodayAssistanceTeacherUseCase.main(
        courseId,
        teacher_id
      );

      return data
    } catch (error) {
      throw error;
    }
  }



}
