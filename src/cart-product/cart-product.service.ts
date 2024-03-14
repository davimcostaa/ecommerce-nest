import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertCartDTO } from 'src/cart/dtos/insert-cart.dto';
import { UpdateCartDTO } from 'src/cart/dtos/update-cart-dto';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';

@Injectable()
export class CartProductService {

    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService
    ){}

    async verifyProductInCart(productId: number, cartId: number): Promise<CartProductEntity> {
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                productId,
                cartId
            }
        })

        if(!cartProduct) {
            throw new NotFoundException('Product not found in cart')
        }

        return cartProduct
    }

    async createProductInCart(insertCart: insertCartDTO, cartId: number): Promise<CartProductEntity> {
        return this.cartProductRepository.save({
            amount: insertCart.amount,
            productId: insertCart.productId,
            cartId
        })
    }

    async insertProductInCart(insertCart: insertCartDTO, cart: CartEntity): Promise<CartProductEntity> {

        await this.productService.findProductById(insertCart.productId)

        const cartProduct = await this.verifyProductInCart(insertCart.productId, cart.id)
        .catch(() => undefined)
        
        if (!cartProduct) {
            return this.createProductInCart(insertCart, cart.id)
        }

        return this.cartProductRepository.save({
            ...cartProduct,
            amount: cartProduct.amount + insertCart.amount
        })

    }

    async updateProductInCart(updateCartDTO: UpdateCartDTO, cart: CartEntity): Promise<CartProductEntity> {

        await this.productService.findProductById(updateCartDTO.productId);

        const cartProduct = await this.verifyProductInCart(updateCartDTO.productId, cart.id);
        
        return this.cartProductRepository.save({
            ...cartProduct,
            amount: updateCartDTO.amount
        })

    }

    async deleteProductFromCard(productId: number, cartId: number): Promise<DeleteResult> {
        return this.cartProductRepository.delete({
            productId, cartId
        })
    }

}
