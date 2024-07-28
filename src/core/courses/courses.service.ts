import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCoursesUseCase } from './domain/create-courses.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { ScheduleDataSource } from '@datasource/schedule.datasource';
import { GetAllCoursesUseCase } from './domain/get-all-courses.useCase';
import { UpdateCoursesUseCase } from './domain/update-courses.useCse';
import { getCoursesTeacherUseCase } from './domain/get-course-teacher.useCase';
import { SearchCoursesUseCase } from './domain/search-courses.useCase';
import { GetOneCourses } from './domain/get-one-courses.useCase';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';
import { SearchQueryParamsDto } from './dto/search-course.dto';
import { ResponseDto } from '@common/utils/pagination/dto/paginated.dto';
import { CoursesDocument } from '@datasource/models/course.model';
import { InProgressCoursesUseCase } from './domain/in-progess-courses.useCase';
import { GetScheduleByStudentUseCase } from './domain/get-schedule-by-student.useCase';
import { DeleteCourseUseCase } from './domain/delete-course-useCase';

@Injectable()
export class CoursesService {

  constructor(private readonly courseModel:CoursesDataSource, private scheduleModel:ScheduleDataSource){}

  async create(createCourseDto: CreateCourseDto) {

    try {
      const courseUseCase = new CreateCoursesUseCase(this.courseModel, this.scheduleModel)
      const data = await courseUseCase.main(createCourseDto);
      return data

    } catch (error) {
      throw error;
    }

  }

  async findAll(query:PaginationQueryParamsDto):Promise<ResponseDto<CoursesDocument>> {

    try {
      
      const courseUseCase = new GetAllCoursesUseCase(this.courseModel, this.scheduleModel)

      const data = await courseUseCase.main(query);
      return data

    } catch (error) {
      throw error;
    }
  }

  async findCoursesByName(query:SearchQueryParamsDto):Promise<ResponseDto<CoursesDocument>> {
    
    try {

      const courseUseCase = new SearchCoursesUseCase(this.courseModel)
      const data = await courseUseCase.main(query);
      return data

    } catch (error) {
      throw error;
    }
  }

  async findOne(id:string){

    try {

      const courseUseCase = new GetOneCourses(this.courseModel)
      const data = await courseUseCase.main(id);
      return data

    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      
      const courseUseCase = new UpdateCoursesUseCase(this.courseModel, this.scheduleModel)
      const data = await courseUseCase.main(id,updateCourseDto);
      return data

    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      
      const courseUseCase = new DeleteCourseUseCase(this.courseModel, this.scheduleModel)
      const data = await courseUseCase.main(id);
      return data

    } catch (error) {
      throw error;
    }
  }

  async getCoursesTeacher(teacherId: string,query:PaginationQueryParamsDto){
    try {
      
      const courseUseCase = new getCoursesTeacherUseCase(this.courseModel)
      const data = await courseUseCase.main(teacherId,query);
      return data

    } catch (error) {
      throw error;
    }
  }

  async progressCourse(){
    try {
      const InProgressCourseUseCase = new InProgressCoursesUseCase(this.courseModel)
      const data = await InProgressCourseUseCase.main();
      return data

    } catch (error) {
      throw error;
    }
  }

  async getSchedule(student_id: string){
    try {
      const getScheduleByStudentUseCase = new GetScheduleByStudentUseCase(this.courseModel)
      const data = await getScheduleByStudentUseCase.main(student_id);
      return data

    } catch (error) {
      throw error;
    }
  }
}
