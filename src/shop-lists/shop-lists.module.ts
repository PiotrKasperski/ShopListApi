import  Item  from 'src/items/entities/item.entity';
import { Module } from '@nestjs/common';
import { ShopListsService } from './shop-lists.service';
import { ShopListsController } from './shop-lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ShopList from './entities/shop-list.entity';


@Module({
  imports:[TypeOrmModule.forFeature([ShopList,Item])],
  controllers: [ShopListsController],
  providers: [ShopListsService]
})
export class ShopListsModule {}
