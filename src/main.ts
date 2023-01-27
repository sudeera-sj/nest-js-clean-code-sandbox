import {NestFactory} from '@nestjs/core';
import {Logger, RequestMethod, ValidationPipe, VersioningType} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import helmet from 'helmet';
import moment from 'moment';
import {AppModule} from '@app/app.module';
import {ApiResponseInterceptor} from '@interceptors/api-response.interceptor';
import {ApiErrorFilter} from '@filters/api-error.filter';
import {EnvironmentConfig} from '@shared/models/env/environment-config.model';

const title = `nest-js-clean-code-sandbox`;
const description = `NestJS Clean Code Sandbox`;
const version = `0.0.1`;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
    }),
  );

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.useGlobalFilters(new ApiErrorFilter());

  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .addSecurityRequirements(`bearer`)
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  const configService = app.get(ConfigService<EnvironmentConfig, true>);

  await app.listen(configService.get('PORT'));

  const currentTime = moment();

  Logger.log(`UTC Offset: ${currentTime.utcOffset()}`);
  Logger.log(`Port: ${configService.get('PORT')}`);
  Logger.log(`Node environment: ${configService.get('NODE_ENV')}`);
};

bootstrap().catch(reason => {
  console.warn('Failed to start the server');
  console.error(reason);
});
