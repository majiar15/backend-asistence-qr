import { Controller, Post, Body} from '@nestjs/common';
import { ContactSupportService } from './contact_support.service';
import { CreateContactSupportDto } from './dto/create-contact_support.dto';

@Controller('contact-support')
export class ContactSupportController {
  constructor(private readonly contactSupportService: ContactSupportService) {}

  @Post()
  create(@Body() createContactSupportDto: CreateContactSupportDto) {
    return this.contactSupportService.create(createContactSupportDto);
  }

  
}
