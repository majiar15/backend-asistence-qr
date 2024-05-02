import { Controller, Get } from '@nestjs/common';
import { AcademicProgramService } from './academic_program.service';
import { Role } from '@common/utils/rol.enum';
import { Roles } from '@common/decorators/roles.decorator';

@Controller('academic-program')
export class AcademicProgramController {
  constructor(private readonly academicProgramService: AcademicProgramService) {}


  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.academicProgramService.findAll();
  }


}
