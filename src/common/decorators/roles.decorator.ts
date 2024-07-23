import { RolesGuard } from '@common/guards/roles/roles.guard';
import { Role } from '@common/utils/rol.enum';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(RolesGuard)
);