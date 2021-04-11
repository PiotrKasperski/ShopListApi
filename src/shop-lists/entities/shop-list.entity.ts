import Item from "src/items/entities/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class ShopList {
    @PrimaryGeneratedColumn()
    public shopListID: number;

    @Column()
    public name: string;

    @OneToMany(()=> Item, item => item.shopList)
    public items: Item[];

}
export default ShopList