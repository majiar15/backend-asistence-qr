import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';
import { EnvConfiguration } from '@common/config/env.config';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            // 💡 See this condition
            return true;
        }
        const request = context.switchToHttp().getRequest();
        
        const token = this.extractTokenFromHeader(request);
        console.log("🚀 ~ AuthGuard ~ canActivate ~ request:", token)
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            console.log("🚀 ~ jwt_secret:", typeof EnvConfiguration().jwt_secret)
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: EnvConfiguration().jwt_secret
                }
                    
            );
            
            console.log("🚀 ~ AuthGuard ~ canActivate ~ payload:", payload)
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (err) {
            console.log("🚀 ~ AuthGuard ~ canActivate ~ err:", err)
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}