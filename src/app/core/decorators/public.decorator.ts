import {SetMetadata} from '@nestjs/common';
import {PUBLIC} from '@constants/decorator-key.constants';

export const Public = () => SetMetadata(PUBLIC, true);
