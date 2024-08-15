import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { dataSourceModule } from '@datasource/datasouce.module';

@Module({
  imports:[dataSourceModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
