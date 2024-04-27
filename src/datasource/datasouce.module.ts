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



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
        MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
        MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
        MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }]),
    ],
    controllers: [],
    exports: [ UserDataSource,CoursesDataSource,ScheduleDataSource, SecretDataSource ],
    providers: [ UserDataSource,CoursesDataSource,ScheduleDataSource, SecretDataSource ]
})
export class dataSourceModule { }
