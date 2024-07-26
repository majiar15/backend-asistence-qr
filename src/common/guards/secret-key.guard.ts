
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@core/auth/auth.service';

@Injectable()
export class SecretKeyGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const secretKey = request.headers['secret-key'];
    if (!secretKey) {
      return false;
    }

    const isValidKey = await this.authService.validateSecretKey(secretKey);
    return isValidKey;
  }
}
