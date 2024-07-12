import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    const objectIdKeys = ['course_id', 'id']
    const key = objectIdKeys.find(k => value.hasOwnProperty(k));
    
    if (!key || !Types.ObjectId.isValid(value[key])) {
      throw new BadRequestException(`Invalid ID format: ${value}`);
    }
    return value;
  }
}
