import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { EnvConfiguration } from '@common/config/env.config';
import { dataSourceModule } from '@datasource/datasouce.module';



@Module({
  imports:[
    dataSourceModule,
    JwtModule.register({
      global: true,
      secret: EnvConfiguration().jwt_secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AuthModule {}
