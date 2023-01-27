import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  warmup(): string {
    return `Warming up the application server`;
  }
}
