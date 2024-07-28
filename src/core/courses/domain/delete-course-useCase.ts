import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { CoursesDataSource } from "@datasource/course.datasource";
import { ScheduleDataSource } from "@datasource/schedule.datasource";



export class DeleteCourseUseCase {

    response: ResponseDto<any>;

    constructor(
        private coursesDataSource: CoursesDataSource,
        private scheduleDataSource: ScheduleDataSource
    ) { }


    async main(course_id: string) {

        try {
            await this.deleteCourseShedules(course_id);
            await this.deleteCourse(course_id);
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    private async deleteCourseShedules(course_id: string) {
         await this.scheduleDataSource.deleteSchedules(course_id);
    }

    private async deleteCourse(course_id: string) {
        const course = await this.coursesDataSource.deleteCourse(course_id)

        if (course.delete) {

            this.response = new ResponseDto<any>(true, { deletedCount: 1 })
            return;
        }
        this.response = new ResponseDto<any>(false, { deletedCount: 0 })
    }
}