import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { AssistanceTeacherService } from './assistanceTeacher.service';
import { Role } from '@common/utils/rol.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { CreateAssistanceDTO } from './dto/create-assistance-teacher.dto';
import { IPayload } from '@common/interfaces/payload.interface';
import { Payload } from '@common/decorators/payload.decorator';

@Controller('assistance-teacher')
export class AssistanceTeacherController {
  constructor(private readonly assistanceTeacherService: AssistanceTeacherService) {}


  @Post('create')
  @Roles(Role.Teacher)
  takeTeacher(@Body() body: CreateAssistanceDTO, @Payload() payload: IPayload) {
    return this.assistanceTeacherService.create(body, payload._id);
  }
  @Get('get-today/:id')
  @Roles(Role.Teacher)
  getToday(@Param('id') courseId: string, @Payload() payload: IPayload) {
    return this.assistanceTeacherService.getToday(courseId, payload._id);
  }

}
