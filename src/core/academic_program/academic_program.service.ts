import { Injectable } from '@nestjs/common';
import { GetAllAcademicProgramUseCase } from './domain/get-all-academic-program.useCase';
import { AcademicProgramDataSource } from '@datasource/academic_program.datasource';

@Injectable()
export class AcademicProgramService {

  constructor(private readonly academicProgram: AcademicProgramDataSource) { }



  findAll() {
    try {

      const academicProgramUseCase = new GetAllAcademicProgramUseCase(this.academicProgram)
      const data = academicProgramUseCase.main();

      return data
    } catch (error) {
      throw error;
    }
  }



}
