import ShopList from "src/shop-lists/entities/shop-list.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Item {
    @PrimaryGeneratedColumn()
    itemID: number;
    @Column()
    count: number;
    @Column()
    productName: string;
    @Column()
    isChecked: boolean;
    @ManyToOne(()=> ShopList, shopList => shopList.items)
    shopList: ShopList;
}
export default Item