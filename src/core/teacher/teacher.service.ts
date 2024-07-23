import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherUseCase } from './domain/create-teacher.useCase';
import { UserDataSource } from '@datasource/user.datasource';
import { GetAllTeacherUseCase } from './domain/get-all-teachers.useCase';
import { GetOneTeacherUseCase } from './domain/get-one-teacher.useCase';
import { UpdateTeachersUseCase } from './domain/update-teacher.useCase';
import { DeleteTeacherUseCase } from './domain/delete-teacher.useCase';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';
import { SearchTeacherUseCase } from './domain/search-teacher.useCase';

@Injectable()
export class TeacherService {

  constructor(private readonly userModel: UserDataSource) { }

  async create(teacherObjectDto: CreateTeacherDto) {

    try {

      const teacherUseCase = new CreateTeacherUseCase(this.userModel)

      const data = await teacherUseCase.main(teacherObjectDto)
      return data;

    } catch (error) {
      throw error;
    }
  }

  async getAllTeachers(query:PaginationQueryParamsDto) {

    try {
      const teacherUseCase = new GetAllTeacherUseCase(this.userModel)
    
      const data = await teacherUseCase.main(query)
      return data;

    } catch (error) {

      throw error;
    }

  }
  async search(search: string, query: PaginationQueryParamsDto) {

    try {
      const teacherUseCase = new SearchTeacherUseCase(this.userModel)
    
      const data = await teacherUseCase.main(search, query)
      return data;

    } catch (error) {

      throw error;
    }

  }

  async findOneTeacher(id: string) {

    try {
       const teacherUseCase = new GetOneTeacherUseCase(this.userModel);

       const response = await teacherUseCase.main(id);
       return response;

    } catch (error) {

      throw error;
    }
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {

    try {
      const teacherUseCase = new UpdateTeachersUseCase(this.userModel);

      const response = await teacherUseCase.main(id,updateTeacherDto);
      return response;
      
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const teacherUseCase = new DeleteTeacherUseCase(this.userModel)
    
      const data = await teacherUseCase.main(id)
      return data;

    } catch (error) {

      throw error;
    }
  }
}
