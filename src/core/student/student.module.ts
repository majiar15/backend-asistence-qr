import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { dataSourceModule } from '@datasource/datasouce.module';

@Module({
  imports:[dataSourceModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
