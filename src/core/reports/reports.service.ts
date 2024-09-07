import { Injectable } from '@nestjs/common';
import { DownloadReportsStudentsUseCase } from './domain/download-reports-students';
import { CoursesDataSource } from '@datasource/course.datasource';
import { AssistanceDataSource } from '@datasource/assistance.datasource';
import { AssistanceTeacherDataSource } from '@datasource/assistance_teacher.datasource';
import { ReportByStudentUseCase } from './domain/report-by-student.useCase';
import { ReportStudentDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {

  constructor(
    private readonly courseModel:CoursesDataSource,
    private readonly assistanceModel: AssistanceDataSource,
    private readonly assistanceTeacherModel: AssistanceTeacherDataSource,
  ){}

  // create(createReportDto: CreateReportDto) {
  //   return 'This action adds a new report';
  // }

  // findAll() {
  //   return `This action returns all reports`;
  // }

  async reportsStudents(courseId: string) {
    try {
      
      const courseUseCase = new DownloadReportsStudentsUseCase(this.courseModel, this.assistanceModel,this.assistanceTeacherModel)
      const data = await courseUseCase.main(courseId);
      return data

    } catch (error) {
      throw error;
    }
  }


  async reportsStudent(query: ReportStudentDto) {
    try {
      
      const courseUseCase = new ReportByStudentUseCase(this.assistanceModel,this.assistanceTeacherModel)
      const data = await courseUseCase.main(query);
      return data

    } catch (error) {
      throw error;
    }
  }

  // update(id: number, updateReportDto: UpdateReportDto) {
  //   return `This action updates a #${id} report`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} report`;
  // }
}
