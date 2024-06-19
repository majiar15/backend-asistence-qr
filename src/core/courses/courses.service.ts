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

@Injectable()
export class CoursesService {

  constructor(private readonly courseModel:CoursesDataSource, private scheduleModel:ScheduleDataSource){}

  create(createCourseDto: CreateCourseDto) {

    try {
      
      const courseUseCase = new CreateCoursesUseCase(this.courseModel, this.scheduleModel)
      const data = courseUseCase.main(createCourseDto);
      return data

    } catch (error) {
      throw error;
    }

  }

  findAll() {

    try {
      
      const courseUseCase = new GetAllCoursesUseCase(this.courseModel, this.scheduleModel)

      const data = courseUseCase.main();
      return data

    } catch (error) {
      throw error;
    }
  }

  findCoursesByName(name: string) {
    
    try {

      const courseUseCase = new SearchCoursesUseCase(this.courseModel)
      const data = courseUseCase.main(name);
      return data

    } catch (error) {
      throw error;
    }
  }

  findOne(id:string){

    try {

      const courseUseCase = new GetOneCourses(this.courseModel)
      const data = courseUseCase.main(id);
      return data

    } catch (error) {
      throw error;
    }
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      
      const courseUseCase = new UpdateCoursesUseCase(this.courseModel, this.scheduleModel)
      const data = courseUseCase.main(id,updateCourseDto);
      return data

    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  getCoursesTeacher(teacherId: string){
    try {
      
      const courseUseCase = new getCoursesTeacherUseCase(this.courseModel)
      const data = courseUseCase.main(teacherId);
      return data

    } catch (error) {
      throw error;
    }
  }
}
