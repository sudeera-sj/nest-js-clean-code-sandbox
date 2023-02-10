import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@guards/auth.guard';

describe('AuthGuard', () => {
  let reflector: Reflector;
  let guard: AuthGuard;

  beforeAll(() => {
    reflector = new Reflector();
  });

  beforeEach(async () => {
    guard = new AuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
