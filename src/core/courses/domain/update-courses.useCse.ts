import { CoursesDataSource } from "@datasource/course.datasource";
import { CoursesDocument } from "@datasource/models/course.model";
import { ScheduleDataSource } from "@datasource/schedule.datasource";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UpdateCourseDto } from "../dto/update-course.dto";

export class UpdateCoursesUseCase {

    private course: Omit<UpdateCourseDto, "schedules">;
    private courseDb: CoursesDocument;
    private schedules: Array<any>;
    private response: { status: boolean; data: any }
    private dataUpdate: any;

    constructor(
        private coursesDataSource: CoursesDataSource, 
        private scheduleDataSource: ScheduleDataSource
    ) { }

    async main(id: string,courseObject: UpdateCourseDto) {
        try {
            await this.checkCourseExists(id)

            await this.subtractDataBody(courseObject);

            await this.validateUpdateData(courseObject)

            await this.updateCourseDB(id)

            await this.updateSchedules();

            return this.response;

        } catch (error) {
            throw error;
        }
    }

    private async checkCourseExists(id: string) {

        this.courseDb = await this.coursesDataSource.getCourseById(id);

        if (!this.courseDb) {
            throw new NotFoundException('COURSE NOT FOUND');
        }

    }

    private subtractDataBody(courseObject: UpdateCourseDto) {

        const { schedules, ...courseData } = courseObject;
        this.schedules = schedules;
        this.course = courseData;

    }

    private async validateUpdateData(courseObject: UpdateCourseDto) {

        this.dataUpdate = {};
        for (const [key, value] of Object.entries(courseObject)) {

            if (key in this.courseDb) {
                if (value) {
                    this.dataUpdate[key] = value;
                }
            }
        }
    }
    private async updateCourseDB(id:string) {
        
        const data = await this.coursesDataSource.updateCourses(id,this.dataUpdate)
        if(!data){
            throw new BadRequestException('THE COURSE WAS NOT UPDATED')
        }
    }

    private async updateSchedules(){

        await this.scheduleDataSource.updateSchedule(this.schedules)

        // Construye la respuesta final
        this.response = {
            status:true,
            data:{
                _id: this.courseDb._id,
                ...this.course,
                schedules: this.schedules
            }
            
        };

    }
}