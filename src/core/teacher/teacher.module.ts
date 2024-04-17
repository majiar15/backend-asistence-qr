import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { dataSourceModule } from '@datasource/datasouce.module';
import { TeacherService } from './teacher.service';

@Module({
  imports:[dataSourceModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
