import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCoursesUseCase } from './domain/create-courses.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { ScheduleDataSource } from '@datasource/schedule.datasource';
import { GetAllCoursesUseCase } from './domain/get-all-courses.useCase';
import { UpdateCoursesUseCase } from './domain/update-courses.useCse';
import { getCoursesTeacherUseCase } from './domain/get-course-teacher.useCase';
@Injectable()
export class CoursesService {

  constructor(private readonly courseModel:CoursesDataSource, private scheduleModel:ScheduleDataSource){}

  create(createCourseDto: CreateCourseDto) {

    try {
      
      const courseUseCase = new CreateCoursesUseCase(this.courseModel, this.scheduleModel)
      const data = courseUseCase.main(createCourseDto);
      console.log("🚀 ~ CoursesService ~ create ~ data:", data)
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

  findOne(id: number) {
    return `This action returns a #${id} course`;
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
