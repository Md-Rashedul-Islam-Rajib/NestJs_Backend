import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enabling global validation pipe for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // whitelisting the properties that are not in the dto will be removed from the request body
      forbidNonWhitelisted: true, // throw an error if any extra property is sent in the request body that is not in the dto
    transform: true, // automatically transform the payloads to be objects typed according to their DTO classes (e.g. string to number conversion based on dtoF
      transformOptions: {
    enableImplicitConversion: true // by enabling this, validation pipe implicitly convert types 
  }  
  }),
  );


// Swagger setup
  const config = new DocumentBuilder()
    .setVersion('1.0') // version of the api
    .setTitle('NestJS Example App') // title of the api
    .setDescription('A simple example app to learn NestJS') // description of the api
    .setTermsOfService('https://example.com/terms') // terms of service url
    .setContact('John Doe', 'https://example.com', "rajib5570@gmail.com")
    .setLicense('MIT', 'https://opensource.org/licenses/MIT') // license of the api
    .addServer('http://localhost:3000') // server url
    .addApiKey({ type: 'apiKey', name: 'Authorization', in: 'header' }, 'Authorization') // adding api key for authentication
    .addBasicAuth() // adding basic auth for authentication
    .addBearerAuth( // adding bearer auth for authentication
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // this name will be used in the @ApiBearerAuth() decorator
  )
    .addCookieAuth() // adding cookie auth for authentication
    // .addGlobalParameters([
    //   { name: 'locale', // adding global parameter for all endpoints
    //     in: 'header',
    //     description: 'Locale',
    //     required: false,
    //     schema: { type: 'string', enum: ['en', 'fr', 'de'] },
    //     example: 'en',
    //   },
    // ])
    // .addGlobalResponse({ // adding global responses for all endpoints
    //   400: { description: 'Bad Request' },
    //   401: { description: 'Unauthorized' },
    //   403: { description: 'Forbidden' },
    //   404: { description: 'Not Found' },
    //   500: { description: 'Internal Server Error' },
    // })
    .addSecurityRequirements('Authorization') // applying api key auth globally
    .build(); // build the document config

  
    // create the swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // setup the swagger at /api endpoint

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
 