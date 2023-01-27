import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<any, boolean | undefined> {
  static transform(value: any, metadata: ArgumentMetadata): boolean | undefined {
    const source = metadata.data || 'field';

    if (typeof value === 'undefined') {
      return value;
    }

    if ([true, 'true', false, 'false'].indexOf(value) < 0) {
      throw new BadRequestException(`${source} must be a valid boolean value`);
    }

    return [true, 'true'].indexOf(value) > -1;
  }

  transform(value: any, metadata: ArgumentMetadata): boolean | undefined {
    return ParseBooleanPipe.transform(value, metadata);
  }
}
