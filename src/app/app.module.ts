import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {ConfigModule} from '@config/config.module';
import {FeaturesModule} from '@features/features.module';
import {AuthGuard} from '@guards/auth.guard';
import {AppController} from '@app/app.controller';
import {AppService} from '@app/app.service';

@Module({
  imports: [ConfigModule, FeaturesModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
