import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from '@app/app.controller';
import {AppService} from '@app/app.service';

describe('AppController', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  it('should be defined', () => {
    const controller = module.get<AppController>(AppController);

    expect(controller).toBeDefined();
  });

  it('should warmup the server', () => {
    const controller = module.get<AppController>(AppController);

    expect(controller.warmup()).toBe(`Warming up the application server`);
  });
});
