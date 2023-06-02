import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/modules/user/enums/role.enum';

export const HasRoles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
