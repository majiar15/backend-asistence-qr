import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from '@common/config/env.config';
import { TeacherModule } from './core/teacher/teacher.module';
import { CoursesModule } from './core/courses/courses.module';
import { AdminModule } from './core/admin/admin.module';
import { StudentModule } from './core/student/student.module';
import { AcademicProgramModule } from './core/academic_program/academic_program.module';
import { AssistanceModule } from './core/assistance/assistance.module';
import { EnrollModule } from './core/enroll/enroll.module';
import { ContactSupportModule } from './core/contact_support/contact_support.module';
import { AssistanceTeacherModule } from './core/assistance_teacher/assistanceTeacher.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRoot(EnvConfiguration().db_uri,{
      dbName: 'Unilibre', // Aquí especificas el nombre de tu base de datos personalizado
      
      retryWrites: true,
      w: 'majority',
    }),
    TeacherModule,
    CoursesModule,
    AdminModule,
    StudentModule,
    AcademicProgramModule,
    AssistanceModule,
    EnrollModule,
    AssistanceTeacherModule,
    ContactSupportModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
