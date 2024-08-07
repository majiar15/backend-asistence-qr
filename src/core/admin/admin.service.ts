import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateAdminUseCase } from './domain/create-admin.useCase';
import { UserDataSource } from '@datasource/user.datasource';
import { GetAllAdminUseCase } from './domain/get-all-admin.useCase';
import { GetOneAdminUseCase } from './domain/get-one-admin.useCase';
import { UpdateAdminUseCase } from './domain/update-admin.useCase';
import { DeleteAdminUseCase } from './domain/delete-admin.useCase';
import { PaginationQueryParamsDto } from '@common/utils/pagination/dto/pagination-query-params.dto';
import { ResponseDto } from '@common/utils/pagination/dto/paginated.dto';
import { Users } from '@datasource/models/user.model';

@Injectable()
export class AdminService {

  constructor(private readonly userModel: UserDataSource) { }

  async create(adminObjectDto: CreateAdminDto) {
  console.log("🚀 ~ AdminService ~ create ~ adminObjectDto:", adminObjectDto)

    try {

      const adminUseCase = new CreateAdminUseCase(this.userModel)

      const data = await adminUseCase.main(adminObjectDto)
      return data;

    } catch (error) {
      throw error;
    }
  }

  async getAllAdmins(query:PaginationQueryParamsDto):Promise<ResponseDto<Users>> {

    try {
      const adminUseCase = new GetAllAdminUseCase(this.userModel)
    
      const data = await adminUseCase.main(query)
      return data;

    } catch (error) {

      throw error;
    }

  }

  async findOneAdmin(id: string) {

    try {
       const adminUseCase = new GetOneAdminUseCase(this.userModel);

       const response = await adminUseCase.main(id);
       return response;

    } catch (error) {

      throw error;
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {

    try {
      const adminUseCase = new UpdateAdminUseCase(this.userModel);

      const response = await adminUseCase.main(id,updateAdminDto);
      return response;
      
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const adminUseCase = new DeleteAdminUseCase(this.userModel)
    
      const data = await adminUseCase.main(id)
      return data;

    } catch (error) {

      throw error;
    }
  }
}
