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
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const data = academicProgramUseCase.main(body.courseId, body.studentId, today);

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
      console.log("date date", date);
      const getByDateAssistanceUseCase = new GetByDateAssistanceUseCase(this.assistance);
      const dateFormat = new Date(date);

      const data = getByDateAssistanceUseCase.main(dateFormat, courseId);

      return data
    } catch (error) {
      throw error;
    }
  }



}
