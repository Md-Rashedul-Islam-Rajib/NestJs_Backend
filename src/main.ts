import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enabling global validation pipe for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // whitelisting the properties that are not in the dto will be removed from the request body
      forbidNonWhitelisted: true, // throw an error if any extra property is sent in the request body that is not in the dto
    transform: true, // automatically transform the payloads to be objects typed according to their DTO classes (e.g. string to number conversion based on dtoF
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
