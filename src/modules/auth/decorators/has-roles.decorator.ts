import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../user/enums/role.enum';

export const HasRoles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
