import { Global, Module } from '@nestjs/common';
import { PrismaMysqlService,PrismaPostgresService } from './prisma.service';
// tự định nghĩa module 
@Global()
@Module({
    providers:[PrismaMysqlService,PrismaPostgresService],
    exports:[PrismaMysqlService,PrismaPostgresService]
})
export class PrismaModule {}
