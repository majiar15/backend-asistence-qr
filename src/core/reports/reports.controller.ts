import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportStudentDto } from './dto/create-report.dto';


@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}


  @Get('download/reports-students/:id')
  reportsStudents(@Param('id') id: string) {
    return this.reportsService.reportsStudents(id);
    
  }

  @Get('student')
  reportsStudent(@Query() query: ReportStudentDto) {
    console.log("🚀 ~ ReportsController ~ reportsStudent ~ id:", query)
    return this.reportsService.reportsStudent(query);
    
  }

  // @Post()
  // create(@Body() createReportDto: CreateReportDto) {
  //   return this.reportsService.create(createReportDto);
  // }

  // @Get()
  // findAll() {
  //   return this.reportsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reportsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
  //   return this.reportsService.update(+id, updateReportDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportsService.remove(+id);
  // }
}
