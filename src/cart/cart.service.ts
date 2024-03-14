import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductService } from 'src/cart-product/cart-product.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { DeleteResult, Repository } from 'typeorm';
import { insertCartDTO } from './dtos/insert-cart.dto';
import { UpdateCartDTO } from './dtos/update-cart-dto';
import { CartEntity } from './entities/cart.entity';

const LINE_AFFECTED = 1;

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService
    ) {}

    async clearCart(userId: number): Promise<DeleteResult>  {

        const cart = await this.findCartByUserId(userId)

        await this.cartRepository.save({
            ...cart,
            active: false
        })

        return {
            raw: [],
            affected: LINE_AFFECTED
        }
    }

    async findCartByUserId(userId: number, isRelations?: boolean): Promise<CartEntity> {

        const relations = isRelations ? {
            cartProduct: { product: true }
        } : undefined

        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true
            },
            relations: relations
        });

        if (!cart) {
            throw new NotFoundException('Cart not found.')
        }

        return cart;
    }

    async createCart(userId: number): Promise<CartEntity> {
        return this.cartRepository.save({
            active: true,
            userId,
        })
    }


    async insertProductInCart(insertCart: insertCartDTO, userId: number):Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId).catch(async () => {
            return this.createCart(userId);
        })

        await this.cartProductService.insertProductInCart(insertCart, cart)

        return cart;
    };

    async deleteProductFromCart(productId: number, userId: number): Promise<DeleteResult> {
        const cart = await this.findCartByUserId(userId);

        return this.cartProductService.deleteProductFromCard(productId, cart.id)
    }

    async updateProductInCart(updateCartDTO: UpdateCartDTO, userId: number): Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId).catch(async () => {
            return this.createCart(userId);
        })

        await this.cartProductService.updateProductInCart(updateCartDTO, cart)

        return cart;
    }
    
}
