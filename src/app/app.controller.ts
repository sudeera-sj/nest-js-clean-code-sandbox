import {Controller, Get, VERSION_NEUTRAL} from '@nestjs/common';
import {AppService} from '@app/app.service';
import {SkipAuthentication} from '@decorators/skip-authentication.decorator';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(``)
  @SkipAuthentication()
  warmup(): string {
    return this.appService.warmup();
  }
}
