import { CoursesDataSource } from "@datasource/course.datasource";
import { CoursesDocument } from "@datasource/models/course.model";
import { CreateCourseDto } from "../dto/create-course.dto";
import { ScheduleDataSource } from "@datasource/schedule.datasource";
import { BadRequestException } from "@nestjs/common";
import { ScheduleDocument } from "@datasource/models/schedule.model";

export class CreateCoursesUseCase {

    private course: Omit<CreateCourseDto, "schedules">;
    private courseDb: CoursesDocument;
    private schedules: Array<any>;
    private schedulesDb:ScheduleDocument[];
    private response: { status: boolean; data: any }

    constructor(
        private coursesDataSource: CoursesDataSource, 
        private scheduleDataSource: ScheduleDataSource
    ) { }

    async main(courseObject: CreateCourseDto) {

        try {
            await this.saveCourse()
            return;
            //Separa data de course y horarios
            this.subtractDataBody(courseObject);

            await this.checkCourseExists()


            await this.saveSchedulesWithCourseId();

            await this.updateCourseWithSchedules();

        } catch (error) {
            throw error;
        }

        return this.response;
    }


    private subtractDataBody(courseObject: CreateCourseDto) {
        const { schedules, ...courseData } = courseObject;
        this.schedules = schedules;
        this.course = courseData;

    }

    private async checkCourseExists() {
        const course = await this.coursesDataSource.getCourses(this.course)
        if(course){
            throw new BadRequestException("Ya existe el curso a crear")
        }
    }

    private async saveCourse() {
        this.course = {
            date_end: new Date(),
            date_start: new Date(),
            description: 'adsasd',
            name: 'asdasd',
            teacher_id: "664915f1d39720f28cd01c97"
        }
        this.courseDb = await this.coursesDataSource.saveCourse(this.course);
    }

    private async saveSchedulesWithCourseId() {
        this.schedules.forEach(schedule => {
            schedule.course_id = this.courseDb._id;
        });

        this.schedulesDb = await this.scheduleDataSource.saveSchedule(this.schedules)
    }

    private async updateCourseWithSchedules(){

        if (!this.courseDb.schedules_ids) {
            this.courseDb.schedules_ids = [];
          }

        //Agrega los IDs de los horarios al curso
        this.schedulesDb.forEach(element => {
            this.courseDb.schedules_ids.push(element._id)
        });
        const updatedCourse = await this.coursesDataSource.updateCourses(this.courseDb._id,this.courseDb);
        console.log("🚀 ~ CreateCoursesUseCase ~ updateCourse ~ data:", updatedCourse)

        // Construye la respuesta final
        this.response = {
            status:true,
            data:{
                _id: this.courseDb._id,
                ...this.course,
                schedules: this.schedulesDb
            }
            
        };
        console.log("🚀 ~ GUARDAR HORARIOS:", updatedCourse)

    }
}