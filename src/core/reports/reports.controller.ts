import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportStudentDto } from './dto/create-report.dto';
import { Response } from 'express';
import * as XLSX from 'xlsx';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}


  @Get('download/reports-students/:id')
  async reportsStudents(@Param('id') courseId: string, @Res() res: Response) {
    const data =  await this.reportsService.reportsStudents(courseId);
    // Preparar los datos en formato de matriz de objetos

    // Crear la hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Crear un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Generar el archivo Excel en un buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Configurar la respuesta HTTP para descarga
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    // Enviar el buffer como respuesta
    res.send(excelBuffer);
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
