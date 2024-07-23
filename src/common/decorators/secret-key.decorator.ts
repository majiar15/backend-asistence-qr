
import { SecretKeyGuard } from '@common/guards/secret-key.guard';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { IS_PUBLIC_KEY } from './public.decorator';

export const SecretKey = () => applyDecorators(
    SetMetadata('secret-key', true),
    SetMetadata(IS_PUBLIC_KEY, true),
    UseGuards(SecretKeyGuard)
);