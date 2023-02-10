import {Test, TestingModule} from '@nestjs/testing';
import {AppService} from '@app/app.service';

describe('AppService', () => {
  let module: TestingModule;
  let service: AppService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppService],
    }).compile();
  });

  beforeEach(() => {
    service = module.get<AppService>(AppService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should warmup the server', () => {
    expect(service.warmup()).toBe(`Warming up the application server`);
  });
});
