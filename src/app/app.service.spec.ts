import {Test, TestingModule} from '@nestjs/testing';
import {AppService} from '@app/app.service';

describe('AppService', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AppService],
    }).compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    const service = module.get<AppService>(AppService);

    expect(service).toBeDefined();
  });

  it('should warmup the server', () => {
    const service = module.get<AppService>(AppService);

    expect(service.warmup()).toBe(`Warming up the application server`);
  });
});
