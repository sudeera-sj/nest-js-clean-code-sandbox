import {Injectable, ValidationPipe} from '@nestjs/common';
import {ValidationPipeOptions} from '@nestjs/common/pipes/validation.pipe';

@Injectable()
export class PayloadTransformationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      transform: true,
    });
  }
}
