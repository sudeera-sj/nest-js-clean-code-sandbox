import {ApiErrorFilter} from '@filters/api-error.filter';

describe('ApiErrorFilter', () => {
  let filter: ApiErrorFilter;

  beforeEach(() => {
    filter = new ApiErrorFilter();
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });
});
