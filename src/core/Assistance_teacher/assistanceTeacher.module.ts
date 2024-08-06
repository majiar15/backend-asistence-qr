import { Module } from '@nestjs/common';
import { AssistanceTeacherService } from './assistanceTeacher.service';
import { AssistanceTeacherController } from './assistanceTeacher.controller';
import { dataSourceModule } from '@datasource/datasouce.module';

@Module({
  imports:[dataSourceModule],
  controllers: [AssistanceTeacherController],
  providers: [AssistanceTeacherService],
})
export class AssistanceTeacherModule {}
