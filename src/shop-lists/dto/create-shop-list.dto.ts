import Item from "src/items/entities/item.entity";

export class CreateShopListDto {
       public name: string;
public userId: number;
    public items: Array<Item>;
}
