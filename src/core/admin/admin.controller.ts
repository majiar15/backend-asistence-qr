import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { RolesGuard } from '@common/guards/roles/roles.guard';
import { SecretKey } from '@common/decorators/secret-key.decorator';


@Controller('admins')
@UseGuards(RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @SecretKey()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @SecretKey()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get(':id')
  @SecretKey()
  findOneAdmin(@Param('id') id: string) {
    return this.adminService.findOneAdmin(id);
  }

  @Put(':id')
  @SecretKey()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @SecretKey()
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
