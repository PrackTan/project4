import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient  } from '.prisma/client-postgres';
import { PrismaClient as PrismaClientMysql } from '.prisma/client-mysql';

@Injectable()
export class PrismaPostgresService extends PrismaClient implements OnModuleInit {
async onModuleInit() {
await this.$connect();
}
}
@Injectable()
export class PrismaMysqlService extends PrismaClientMysql implements OnModuleInit {
async onModuleInit() {
await this.$connect();
}
}