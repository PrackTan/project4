import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>({
        secret: configService.get<string>("JWT_SECRET") || 'defaultSecret', // Đọc từ biến môi trường
        signOptions: { expiresIn: '5m' },
      })
    })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
