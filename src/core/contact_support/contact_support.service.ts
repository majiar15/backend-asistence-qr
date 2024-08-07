import { Injectable } from '@nestjs/common';
import { CreateContactSupportDto } from './dto/create-contact_support.dto';
import { CreateContactSupportUseCase } from './domain/create_contact_support.useCase';
import { ContactSupportDataSource } from '@datasource/contact_support.datasource';

@Injectable()
export class ContactSupportService {


  constructor(private readonly contactSupportModel:ContactSupportDataSource){}


  async create(body: CreateContactSupportDto) {
   try {
    const contactSupport = new CreateContactSupportUseCase(this.contactSupportModel)
    const data = await contactSupport.main(body);
    return data
   } catch (error) {
      throw error;
   }
  }

  
}
