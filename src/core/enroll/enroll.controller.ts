import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile,} from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { Role } from '@common/utils/rol.enum';
import { Roles } from '@common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@common/config/multer.config';

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


  @Post('upload')
  @Roles(Role.Admin,Role.Teacher)
  @UseInterceptors(FileInterceptor('file',multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File,@Body('course_id') course_id: string,){
    return this.enrollService.uploadFile(file,course_id)
  }

}
