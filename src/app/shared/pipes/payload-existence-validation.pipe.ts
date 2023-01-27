import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class PayloadExistenceValidationPipe implements PipeTransform {
  transform(payload: any, metadata: ArgumentMetadata): any {
    const type = typeof payload;

    switch (type) {
      case 'undefined':
        throw new BadRequestException('Payload should not be empty');
      case 'object':
        if (payload === null || (Array.isArray(payload) && !payload.length) || !Object.keys(payload).length) {
          throw new BadRequestException('Payload should not be empty');
        }

        break;
      default:
        break;
    }

    return payload;
  }
}
