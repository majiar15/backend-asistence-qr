
import { Users } from "@datasource/models/user.model";
import { BadRequestException, ForbiddenException, HttpException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import * as moment from 'moment-timezone';
import { Document, Types } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { StudentDataSource } from "@datasource/student.datasource";
import { StudentAuthDto } from "../dto/student-auth.dto";
import { DeviceDataSource } from "@datasource/device.datasource";
import { DeviceDocument } from "@datasource/models/device.model";


export class LoginStudentUseCase {
  user!: Document<unknown, any, Users> & Users & {
    _id: Types.ObjectId;
  };

  device: DeviceDocument;

  response: { status: boolean; token: string; data: Document<unknown, any, Users> & Users & { _id: Types.ObjectId; }; }

  private readonly timezone = 'America/Bogota';

  constructor(
    private studentDatasource: StudentDataSource,
    private deviceDatasource: DeviceDataSource,
    private jwtService: JwtService
  ) { }

  async main(studentAuth: StudentAuthDto) {

    try {


      await this.getDataUser(studentAuth.dni)

      await this.getDeviceStudent(studentAuth);

      await this.checkAndDecodePassword(studentAuth.password)

      await this.createDeviceStudent(studentAuth);

      await this.generateTokenJWT()

    } catch (error) {

      throw error
    }
    return this.response
  }


  private getCurrentDateTime(): string {
    return moment().tz(this.timezone).format('YYYY-MM-DD HH:mm:ss');
  }

  private async getDataUser(dni: number) {

    const findUser = await this.studentDatasource.getStudentByDni(dni);

    if (!findUser) {
      throw new HttpException({ status: false, message: 'STUDENT_NOT_FOUND' }, 404)
    }

    this.user = findUser;

  }

  private async getDeviceStudent(studentAuth: StudentAuthDto) {

    
    const { brand, display, device_id, model } = studentAuth;
    const query = {
      brand, display, device_id, model,
    }

    this.device = await this.deviceDatasource.getDevice(query);

    if (this.device) {

      const date = this.getCurrentDateTime();

      if (this.device.date) {
        const deviceDate = moment(this.device.date);
        const today = moment(date);

        const differenceInSeconds = Math.abs(today.diff(deviceDate, 'seconds'));

        if (differenceInSeconds < 7200 && !this.device.student_id.equals(this.user._id)) {
          throw new ForbiddenException('DEVICE_ALREADY_IN_USE_BY_STUDENT');
        }
      }

      const deviceUpdate = await this.deviceDatasource.updateDevice(query, { student_id: this.user._id })
      if (!deviceUpdate) {
        throw new BadRequestException('DEVICE_ASSOCIATION_FAILED');
      }
    }
  }




  private async checkAndDecodePassword(password: string) {

    const isPasswordValid = await bcrypt.compare(password, this.user.password);

    if (!isPasswordValid ) throw new HttpException({ status: false, message: 'INVALID_PASSWORD' }, 403)

    this.user.set('password', undefined, { strict: false })
  }

  private async createDeviceStudent(studentAuth: StudentAuthDto) {
    if (!this.device) {
      const { brand, display, device_id, model } = studentAuth;
      const data = { brand, display, device_id, model, student_id: this.user._id };

      await this.deviceDatasource.saveDevice(data)
      
    }
  }


  private async generateTokenJWT() {

    const payload = {
      id: this.user._id,
      name: this.user.name,
      surnames: this.user.surnames,
      email: this.user.email,
      role: this.user.role,
      dni: this.user.dni,
      phone: this.user.phone,

    }

    const token = await this.jwtService.signAsync(payload);

    this.response = { status: true, token, data: this.user };
  }
}
