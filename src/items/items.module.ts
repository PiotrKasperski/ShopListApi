import { ShopListsService } from './../shop-lists/shop-lists.service';
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Item from './entities/item.entity';
import ShopList from 'src/shop-lists/entities/shop-list.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Item, ShopList])],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule {}
