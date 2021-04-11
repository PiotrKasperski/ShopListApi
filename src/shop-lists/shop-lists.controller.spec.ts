import { Test, TestingModule } from '@nestjs/testing';
import { ShopListsController } from './shop-lists.controller';
import { ShopListsService } from './shop-lists.service';

describe('ShopListsController', () => {
  let controller: ShopListsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopListsController],
      providers: [ShopListsService],
    }).compile();

    controller = module.get<ShopListsController>(ShopListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
