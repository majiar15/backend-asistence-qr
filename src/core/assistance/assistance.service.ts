import { Injectable } from '@nestjs/common';
import { takeAssistanceUseCase } from './domain/take_assistance.useCase';
import { AssistanceDataSource } from '@datasource/assistance.datasource';
import { TakeAssistanceDTO } from './dto/take-assistance.dto';

@Injectable()
export class AssistanceService {

  constructor(private readonly assistance: AssistanceDataSource) { }



  take(body: TakeAssistanceDTO) {
    try {

      const academicProgramUseCase = new takeAssistanceUseCase(this.assistance)
      const data = academicProgramUseCase.main(body.courseId, body.studentId, "05/06/2024");

      return data
    } catch (error) {
      throw error;
    }
  }



}
