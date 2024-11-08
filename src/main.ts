import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API Description')
    .build();

  const document = SwaggerModule.createDocument(app,config);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
