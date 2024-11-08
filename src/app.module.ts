import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
///module gốc

@Module({
  imports: [UsersModule,ConfigModule.forRoot({isGlobal:true}), PrismaModule, ProductsModule, AuthModule,JwtModule.register({global:true})],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
