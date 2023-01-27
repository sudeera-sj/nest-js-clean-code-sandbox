import {Logger, Module, NotAcceptableException} from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config';
import {validateSync} from 'class-validator';
import {instanceToInstance} from 'class-transformer';
import {EnvironmentConfig} from '@shared/models/env/environment-config.model';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: config => {
        const logger = new Logger(ConfigModule.name);

        const environmentConfig = new EnvironmentConfig();

        Object.assign(environmentConfig, config);

        logger.log(`Validating environment variables`);

        const data = instanceToInstance(environmentConfig);

        const results = validateSync(data, {
          forbidUnknownValues: false,
        });

        if (results.length > 0) {
          throw new NotAcceptableException(
            results.map(value => value.toString(false)).join(','),
            'Invalid environment variable config',
          );
        }

        logger.log(`Environment variables validated`);

        return data;
      },
    }),
  ],
})
export class ConfigModule {}
