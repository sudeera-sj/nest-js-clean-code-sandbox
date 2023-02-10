import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from '@app/app.controller';
import {AppService} from '@app/app.service';

describe('AppController', () => {
  let module: TestingModule;
  let controller: AppController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  beforeEach(() => {
    controller = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should warmup the server', () => {
    expect(controller.warmup()).toBe(`Warming up the application server`);
  });
});
