import { CartEntity } from "src/cart/entities/cart.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn  } from "typeorm";

@Entity({name: 'cart_product'})
export class CartProductEntity {
    map(arg0: (cartProduct: any) => import("../dtos/return-cart-product.dto").ReturnCardProductDTO): CartProductEntity[] {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'cart_id', nullable: false})
    cartId: number;

    @Column({name: 'product_id', nullable: false})
    productId: number;

    @Column({name: 'amount', nullable: false})
    amount: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @ManyToOne(() => ProductEntity, (productEntity: ProductEntity) => productEntity.cartProduct)
    @JoinColumn({name: 'product_id', referencedColumnName: 'id'})
    product?: ProductEntity

    @ManyToOne(() => CartEntity, (cartEntity: CartEntity) => cartEntity.cartProduct)
    @JoinColumn({name: 'cart_id', referencedColumnName: 'id'})
    cart?: CartEntity
}