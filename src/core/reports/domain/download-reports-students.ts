import { CoursesDataSource } from "@datasource/course.datasource";
import { AssistanceDataSource } from "@datasource/assistance.datasource";
import { CoursesDocument } from "@datasource/models/course.model";
import { NotFoundException } from "@nestjs/common";

import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import * as XLSX from 'xlsx';
import { join } from "path";

export class DownloadReportsStudentsUseCase{

    course:CoursesDocument;
    assistanceStudents:any[];
    assistanceTeachers:any[];
    wsData :any[];

    constructor(
        private coursesDataSource: CoursesDataSource,
        private assistanceDataSource: AssistanceDataSource,
        private assistanceTeacherDataSource: AssistanceTeacherDataSource,
       
    ){}

    async main(course_id:string){

        try {
            await this.getAssistanceTeacherForCourse(course_id)
            await this.getAssistanceForCourse(course_id)
            const response = await this.loadExcel();
            return response
        } catch (error) {
            throw error;
        }

    }


    private async getAssistanceTeacherForCourse(course_id:string){

        this.assistanceTeachers = await this.assistanceTeacherDataSource.getAssistanceTeacherForCourse(course_id);
        console.log("🚀 ~  getAssistanceTeacherForCourse ", this.assistanceTeachers)
        if(!this.assistanceTeachers){
            throw new NotFoundException(`ASSISTANCE_TEACHER_NOT_FOUND`);
        }

    }

    private async getAssistanceForCourse(course_id:string){

        this.assistanceStudents = await this.assistanceDataSource.getAssistanceForCourse(course_id)
        console.log("🚀 ~  this.assistance:",  this.assistanceStudents)
        if(!this.assistanceStudents){
            throw new NotFoundException(`ASSISTANCE_NOT_FOUND`);
        }
        
    }

    

    private async loadExcel(){

        const filePath = join(__dirname, '../../../../uploads/matr43.xlsx');

        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const wsData = XLSX.utils.sheet_to_json(worksheet);


        

        this.assistanceStudents.forEach(student => {
            const attendanceDates = student.dates.join(', ');
            wsData.push([student.dni, `${student.name} ${student.surnames}`, student.course, attendanceDates]);
          });
        //   let row = 18;
        //   this.assistanceStudents.forEach((student,index) => {
        //     worksheet[`B${row}`] = { v: index };
        //     worksheet[`F${row}`] = { v: student.code };
        //     worksheet[`K${row}`] = { v: student.dni };
        //     worksheet[`O${row}`] = { v: student.academicProgram };
        //     worksheet[`S${row}`] = { v: student.ID };
        //     worksheet[`X${row}`] = { v: student.ID };
        //     worksheet[`Z${row}`] = { v: student.ID };
        //     row++;
        //   });
          const newWorksheet = XLSX.utils.json_to_sheet(wsData);

          workbook.Sheets[sheetName] = newWorksheet;
      
          // Generar el buffer del archivo Excel
          const newFilePath = join(__dirname, '../../../../', 'public', 'modified_template.xlsx');
          XLSX.writeFile(workbook, newFilePath);
          return `Archivo modificado guardado en: /public/modified_template.xlsx`;
    }
}