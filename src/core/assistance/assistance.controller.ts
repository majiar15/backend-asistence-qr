import { Body, Controller, Post } from '@nestjs/common';
import { AssistanceService } from './assistance.service';
import { Role } from '@common/utils/rol.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { TakeAssistanceDTO } from './dto/take-assistance.dto';

@Controller('assistance')
export class AssistanceController {
  constructor(private readonly assistanceService: AssistanceService) {}


  @Post('take/teacher')
  @Roles(Role.Teacher)
  takeTeacher(@Body() body: TakeAssistanceDTO) {
    return this.assistanceService.take(body);
  }


}
