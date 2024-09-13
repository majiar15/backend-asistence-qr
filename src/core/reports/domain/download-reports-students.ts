import { CoursesDataSource } from "@datasource/course.datasource";
import { AssistanceDataSource } from "@datasource/assistance.datasource";
import { NotFoundException } from "@nestjs/common";

import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { formatDate } from "@common/utils/formatDate";

export class DownloadReportsStudentsUseCase{

    course:any;
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
            await this.getCourse(course_id)
            await this.getAssistanceTeacherForCourse(course_id)
            await this.getAssistanceForCourse(course_id)
            const data = await this.buildJson();
            // const response = await this.loadExcel();
            return data;
        } catch (error) {
            throw error;
        }

    }
    
    async getCourse(course_id: string) { 
        this.course = await this.coursesDataSource.getCourseById(course_id);
        console.log("🚀 ~  getCourseById ", this.course)
        if(!this.course){
            throw new NotFoundException(`COURSE_NOT_FOUND`);
        }
    }


    private async getAssistanceTeacherForCourse(course_id:string){

        this.assistanceTeachers = await this.assistanceTeacherDataSource.getAssistanceTeacherForCourse(course_id);
        //console.log("🚀 ~  getAssistanceTeacherForCourse ", this.assistanceTeachers)
        if(!this.assistanceTeachers){
            throw new NotFoundException(`ASSISTANCE_TEACHER_NOT_FOUND`);
        }

    }

    private async getAssistanceForCourse(course_id:string){

        this.assistanceStudents = await this.assistanceDataSource.getAssistanceForCourse(course_id)
        if(!this.assistanceStudents){
            throw new NotFoundException(`ASSISTANCE_NOT_FOUND`);
        }
        
    }

    async buildJson() {

        const professorDates = this.assistanceTeachers.map(item => formatDate(item.date));
        console.log("🚀 ~ this.course:", this.course) 
        const header =[
            ['Facultad',this.course.academic_programs[0].faculty],
            ['Programa',this.course.academic_programs[0].name],
            ['Materia',this.course.name],
            ['Docente',this.course.teacher_id.name+ ' '+this.course.teacher_id.surnames],
            ['[ X ] Llegó puntual | [ - ] Llegó tarde | [     ] No asistió'],
            ['']
        ]
        // Crea la fila de encabezado
        const info = [ 'Código','No. Identificacion','Codigo programa','Nombre','Correo institucional', ...professorDates];

        const sortedStudentsData = this.assistanceStudents.sort((a, b) => a.name.localeCompare(b.name));

        const rows = sortedStudentsData.map(student => {
            const studentName = `${student.name} ${student.surnames}`;
            const dni = student.dni;
            const code = student.code;
            const program = student.academicProgram;
            const email = student.email;
            // Compara las fechas y marca con "X" si el estudiante asistió
            const attendance = professorDates.map(date => {
              const studentAttendance = student.dates.find(d => d.date === date);
              return studentAttendance 
                ?  studentAttendance.late 
                    ? '-'
                    : "X" 
                : '';
            });
            return [code,dni,program,studentName,email, ...attendance];
          });
        return [...header,info, ...rows];
    }
         
}