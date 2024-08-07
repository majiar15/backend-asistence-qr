import { Module } from '@nestjs/common';
import { ContactSupportService } from './contact_support.service';
import { ContactSupportController } from './contact_support.controller';
import { dataSourceModule } from '@datasource/datasouce.module';

@Module({
  imports:[
    dataSourceModule
  ],
  controllers: [ContactSupportController],
  providers: [ContactSupportService],
})
export class ContactSupportModule {}
