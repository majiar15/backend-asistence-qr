import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './models/user.model';
import { UserDataSource } from './user.datasource';
import { Courses, CoursesSchema } from './models/course.model';
import { Schedule, ScheduleSchema } from './models/schedule.model';
import { CoursesDataSource } from './course.datasource';
import { ScheduleDataSource } from './schedule.datasource';
import { SecretDataSource } from './secret.datasource';
import { Secret, SecretSchema } from './models/secret.model';
import { AcademicProgram, AcademicProgramSchema } from './models/academic_programs.model';
import { AcademicProgramDataSource } from './academic_program.datasource';
import { Student, StudentsSchema } from './models/student.model';
import { StudentDataSource } from './student.datasource';
import { AssistanceDataSource } from './assistance.datasource';
import { Assistance,AssistanceSchema } from './models/assistance.model';
import { Device, DeviceSchema } from './models/device.model';
import { DeviceDataSource } from './device.datasource';
import { AssistanceTeacher, AssistanceTeacherSchema } from './models/assistance_teacher.model';
import { AssistanceTeacherDataSource } from './assistance_teacher.datasource'; 
import { ContactSupportDataSource } from './contact_support.datasource';
import { ContactSupport, ContactSupportSchema } from './models/contact_support.model';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
        MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
        MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }]),
        MongooseModule.forFeature([{ name: AcademicProgram.name, schema: AcademicProgramSchema }]),
        MongooseModule.forFeature([{ name: Student.name, schema: StudentsSchema }]),
        MongooseModule.forFeature([{ name: Assistance.name, schema: AssistanceSchema }]),
        MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
        MongooseModule.forFeature([{ name: AssistanceTeacher.name, schema: AssistanceTeacherSchema }]),
        MongooseModule.forFeature([{ name: ContactSupport.name, schema: ContactSupportSchema }]),
    ],
    controllers: [],
    exports: [
        UserDataSource,
        CoursesDataSource,
        ScheduleDataSource,
        SecretDataSource,
        AcademicProgramDataSource,
        StudentDataSource,
        AssistanceDataSource,
        DeviceDataSource,
        AssistanceTeacherDataSource,
        ContactSupportDataSource
    ],
    providers: [
        UserDataSource,
        CoursesDataSource,
        ScheduleDataSource,
        SecretDataSource,
        AcademicProgramDataSource,
        StudentDataSource,
        AssistanceDataSource,
        DeviceDataSource,
        AssistanceTeacherDataSource,
        ContactSupportDataSource
    ]
})
export class dataSourceModule { }
