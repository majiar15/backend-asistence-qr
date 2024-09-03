import { AssistanceDataSource } from "@datasource/assistance.datasource";
import { AssistanceTeacherDataSource } from "@datasource/assistance_teacher.datasource";
import { ReportStudentDto } from "../dto/create-report.dto";
import { CoursesDocument } from "@datasource/models/course.model";
import { NotFoundException } from "@nestjs/common";


export class ReportByStudentUseCase {

    course: CoursesDocument;
    assistanceStudents: any[];
    assistanceTeachers: any[];
    response: { status: boolean; data?: any }

    constructor(
        private assistanceDataSource: AssistanceDataSource,
        private assistanceTeacherDataSource: AssistanceTeacherDataSource,
    ) { }

    async main(query: ReportStudentDto) {
        try {
            await this.getAssistanceTeacherForCourse(query.course_id);
            await this.getAssistanceStudentForDate(query)
            return this.response;
        } catch (error) {
            throw error;
        }
    }

    private async getAssistanceTeacherForCourse(course_id: string) {

        this.assistanceTeachers = await this.assistanceTeacherDataSource.getAssistanceTeacherForCourse(course_id);

        if (this.assistanceTeachers.length === 0) {
            throw new NotFoundException(`ASSISTANCE_TEACHER_NOT_FOUND`);
        }

    }

    private async getAssistanceStudentForDate(query: ReportStudentDto) {
        const studentAssistance = await this.assistanceDataSource.getStudentAssistanceByCourse(query.student_id, query.course_id);

        const updatedTeacherAssistance = this.assistanceTeachers.map(value => {
            const teacherDate = this.formatDate(value.date);
            const matchingAssistances = studentAssistance.filter(sa => this.formatDate(sa.date) === teacherDate);
    
            return {
                _id: value._id,
                date: value.date,
                bitacora: value.bitacora,
                course_id: value.course_id,
                teacher_id: value.teacher_id,
                hour_start: value.hour_start,
                isCancel: value.isCancel,
                //secret: value.secret,
                assistances: matchingAssistances
            };;
        });

        this.response = { status: true, data: updatedTeacherAssistance }
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
}
