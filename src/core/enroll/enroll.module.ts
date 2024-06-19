import { Module } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { EnrollController } from './enroll.controller';
import { dataSourceModule } from '@datasource/datasouce.module';

@Module({
  imports:[dataSourceModule],
  controllers: [EnrollController],
  providers: [EnrollService],
})
export class EnrollModule {}
