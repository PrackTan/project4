import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [UsersController],
  exports: [UsersService],      
  providers: [UsersService],
})
export class UsersModule {}

