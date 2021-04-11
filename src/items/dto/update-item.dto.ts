


import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import Item from './../entities/item.entity';
export class UpdateItemDto extends PartialType(CreateItemDto) {
    itemId: number;
    count: number;
    productName:string;
    isChecked: boolean;

    toEntity(item:Item) {
    item.itemID=this.itemId;
    item.isChecked=this.isChecked;
    item.productName=this.productName;
    item.count=this.count;
    return item
    }

   
}
