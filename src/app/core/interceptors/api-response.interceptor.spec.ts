import {ApiResponseInterceptor} from '@interceptors/api-response.interceptor';

describe('ApiResponseInterceptor', () => {
  let interceptor: ApiResponseInterceptor<any>;

  beforeEach(() => {
    interceptor = new ApiResponseInterceptor<any>();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
