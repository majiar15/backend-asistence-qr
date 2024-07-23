import { Controller, Post, Body, Get, Param,} from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { Role } from '@common/utils/rol.enum';
import { Roles } from '@common/decorators/roles.decorator';

@Controller('enroll')
export class EnrollController {
  constructor(private readonly enrollService: EnrollService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createEnrollDto: CreateEnrollDto) {
    return this.enrollService.create(createEnrollDto);
  }

  @Get('student/:courseId')
  @Roles(Role.Teacher)
  getStudentEnroll(@Param('courseId') courseId: string) {
    return this.enrollService.getStudentEnrolled(courseId);
  }

}
