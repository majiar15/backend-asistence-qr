import { Injectable } from '@nestjs/common';
import { takeAssistanceUseCase } from './domain/take_assistance.useCase';
import { AssistanceDataSource } from '@datasource/assistance.datasource';
import { TakeAssistanceDTO } from './dto/take-assistance.dto';
import {  LastAssistanceUseCase } from './domain/last_assistance.useCase';
import { GetByDateAssistanceUseCase } from './domain/get_by_date.useCase';

@Injectable()
export class AssistanceService {

  constructor(
    private readonly assistance: AssistanceDataSource,
  ) { }



  take(body: TakeAssistanceDTO) {
    try {

      const academicProgramUseCase = new takeAssistanceUseCase(this.assistance)
      
      const data = academicProgramUseCase.main(body.courseId, body.studentId);

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
