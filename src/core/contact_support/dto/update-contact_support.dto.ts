import { PartialType } from '@nestjs/mapped-types';
import { CreateContactSupportDto } from './create-contact_support.dto';

export class UpdateContactSupportDto extends PartialType(CreateContactSupportDto) {}
