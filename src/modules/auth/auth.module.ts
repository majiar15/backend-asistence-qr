import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
<<<<<<<< HEAD:src/core/auth/auth.module.ts
import { AuthGuard } from '@common/guards/auth.guard';
========
import { jwtConstants } from './constants';
import { AuthGuard } from '../../common/guards/auth.guard';
>>>>>>>> 8d2643abdffca757929c6d24b1a0dde306373c22:src/modules/auth/auth.module.ts
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
