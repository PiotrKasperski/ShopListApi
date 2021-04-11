
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Item from 'src/items/entities/item.entity';
import { Repository } from 'typeorm';
import { CreateShopListDto } from './dto/create-shop-list.dto';
import { UpdateShopListDto } from './dto/update-shop-list.dto';
import  ShopList  from './entities/shop-list.entity';

@Injectable()
export class ShopListsService {
  constructor(
   @InjectRepository(ShopList)
   private shopListRepository: Repository<ShopList>
   ){}
  private readonly logger = new Logger(ShopListsService.name);
  async create(createShopListDto:CreateShopListDto) {
   const shopList= new ShopList();
    shopList.name= createShopListDto.name;
    shopList.items=createShopListDto.items;
    await this.shopListRepository.save(shopList);
    this.logger.log('New shoplist was created. id:'+ shopList.shopListID +' name: '+shopList.name);
    return shopList;
  }

  findAll() {
    return this.shopListRepository.find();
  }

  findOne(id: number):ShopList {
    return this.findOne(id);
  }

  update(id: number, updateShopListDto: UpdateShopListDto) {
    return `This action updates a #${id} shopList`;
  }

  async remove(id: number) {
    return await this.shopListRepository.delete(id);
  }
}
