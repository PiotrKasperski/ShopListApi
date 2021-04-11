import Item from "src/items/entities/item.entity";

export class CreateShopListDto {
       public name: string;

    public items: Array<Item>;
}
