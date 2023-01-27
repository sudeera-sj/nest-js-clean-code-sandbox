import {SetMetadata} from '@nestjs/common';
import {SKIP_AUTHENTICATION} from '@constants/decorator-key.constants';

export const SkipAuthentication = () => SetMetadata(SKIP_AUTHENTICATION, true);
