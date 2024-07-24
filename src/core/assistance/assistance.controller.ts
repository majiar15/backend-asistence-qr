import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  @Get('last/:id')
  @Roles(Role.Teacher)
  lasAssistance(@Param('id') courseId: string) {
    return this.assistanceService.lastAssistance(courseId);
  }
  @Get('date')
  @Roles(Role.Teacher)
  getByDate(
    @Query('courseId') courseId: string,
    @Query('date') date: string,
  ) {
    return this.assistanceService.getByDate(date, courseId);
  }
  @Get('date/student')
  @Roles(Role.Student)
  getByDateStudent(
    @Query('courseId') courseId: string,
    @Query('date') date: string,
  ) {
    return this.assistanceService.getByDate(date, courseId);
  }


}
