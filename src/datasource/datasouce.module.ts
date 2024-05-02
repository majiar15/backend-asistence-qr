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



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
        MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
        MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }]),
        MongooseModule.forFeature([{ name: AcademicProgram.name, schema: AcademicProgramSchema }]),
        MongooseModule.forFeature([{ name: Student.name, schema: StudentsSchema }]),
    ],
    controllers: [],
    exports: [ 
        UserDataSource,
        CoursesDataSource,
        ScheduleDataSource, 
        SecretDataSource,
        AcademicProgramDataSource,
        StudentDataSource,
    ],
    providers: [ 
        UserDataSource,
        CoursesDataSource,
        ScheduleDataSource, 
        SecretDataSource,
        AcademicProgramDataSource,
        StudentDataSource
    ]
})
export class dataSourceModule { }
