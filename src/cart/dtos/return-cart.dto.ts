import { ReturnCardProductDTO } from "src/cart-product/dtos/return-cart-product.dto";
import { CartProductEntity } from "src/cart-product/entities/cart-product.entity";
import { CartEntity } from "../entities/cart.entity";

export class ReturnCartDTO {

    id: number;
    cartProduct?: CartProductEntity[];

    constructor(cart: CartEntity) {
        this.id = cart.id;
        this.cartProduct = cart.cartProduct ? 
            cart.cartProduct.map((cartProduct) => new ReturnCardProductDTO(cartProduct)) : undefined
    }

}