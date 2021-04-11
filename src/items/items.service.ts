

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import Item from './entities/item.entity';
import ShopList from 'src/shop-lists/entities/shop-list.entity';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(ShopList)
    private shopListRepository:Repository<ShopList>
  ){}

  async findByShoplistID(shopListID: number){
    return this.itemRepository.find({
      where:{
        shopList: shopListID
      }
    })
  }
  async create(createItemDto: CreateItemDto) {
    const item = new Item();
    item.productName='';
    item.count=0;
    item.isChecked=false;
    item.shopList= await this.shopListRepository.findOne(createItemDto.shopListID);
    await this.itemRepository.save(item);
    this.logger.log('New item created. ID: '+item.itemID)
    return item;
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
      const item = await this.itemRepository.findOne(id);
       item.productName = updateItemDto.productName;
       item.count = updateItemDto.count;
       item.isChecked=updateItemDto.isChecked;
      return await this.itemRepository.save(item);
  }

 async remove(id: number) {
    const item =await this.itemRepository.findOne({relations: ["shopList"], where:{itemID: id}});
    await this.itemRepository.delete(id);
    return await this.findByShoplistID(item.shopList.shopListID);
  }
}
