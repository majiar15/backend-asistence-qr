import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCoursesUseCase } from './domain/create-courses.useCase';
import { CoursesDataSource } from '@datasource/course.datasource';
import { ScheduleDataSource } from '@datasource/schedule.datasource';
import { GetAllCoursesUseCase } from './domain/get-all-courses.useCase';

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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    console.log("🚀 ~ CoursesService ~ update ~ updateCourseDto:", updateCourseDto)
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
