import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from '@common/config/env.config';
import { TeacherModule } from './core/teacher/teacher.module';
import { CoursesModule } from './core/courses/courses.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRoot(EnvConfiguration().db_uri),
    TeacherModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
