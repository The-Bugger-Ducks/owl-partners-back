import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { PrismaModule } from './infra/database';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: []
})
export class AppModule { }
