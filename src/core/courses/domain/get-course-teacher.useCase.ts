import { CoursesDataSource } from "@datasource/course.datasource";



export class getCoursesTeacherUseCase {

    private courses;
    private response: { status: boolean; data: any }

    constructor(
        private coursesDataSource: CoursesDataSource, 
    ) { }

    async main(teacherId: string) {

        try {
            this.courses = await this.coursesDataSource.getCoursesByTeacher(teacherId);
            this.response = { status: true, data:this.courses};
        } catch (error) {
            throw error;
        }

        return this.response;
    }

}