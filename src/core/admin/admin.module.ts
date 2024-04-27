import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { dataSourceModule } from '@datasource/datasouce.module';
import { AdminService } from './admin.service';
import { AuthService } from '@core/auth/auth.service';

@Module({
  imports:[dataSourceModule],
  controllers: [AdminController],
  providers: [AdminService, AuthService],
})
export class AdminModule {}
