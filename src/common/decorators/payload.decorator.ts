import { IPayload } from '@common/interfaces/payload.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const Payload = createParamDecorator(
    (data: unknown, context: ExecutionContext):IPayload =>  {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Token de autorización no encontrado');
        }

        const jwtService = new JwtService();
        const payload = jwtService.decode(token) as IPayload;
        if (!payload) {
            throw new Error('Token inválido');
        }

        return payload;
    },
);
