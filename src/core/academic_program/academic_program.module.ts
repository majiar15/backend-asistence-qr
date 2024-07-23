import { Module } from '@nestjs/common';
import { AcademicProgramService } from './academic_program.service';
import { AcademicProgramController } from './academic_program.controller';
import { dataSourceModule } from '@datasource/datasouce.module';

@Module({
  imports:[dataSourceModule],
  controllers: [AcademicProgramController],
  providers: [AcademicProgramService],
})
export class AcademicProgramModule {}
