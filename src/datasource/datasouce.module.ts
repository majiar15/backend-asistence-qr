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



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
        MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
        MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }]),
        MongooseModule.forFeature([{ name: AcademicProgram.name, schema: AcademicProgramSchema }]),
        MongooseModule.forFeature([{ name: Student.name, schema: StudentsSchema }]),
        MongooseModule.forFeature([{ name: Assistance.name, schema: AssistanceSchema }]),
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
    ],
    providers: [
        UserDataSource,
        CoursesDataSource,
        ScheduleDataSource,
        SecretDataSource,
        AcademicProgramDataSource,
        StudentDataSource,
        AssistanceDataSource
    ]
})
export class dataSourceModule { }
