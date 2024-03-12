import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDTO } from './dtos/update-product';

@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly categoryService: CategoryService
    ){}

    async createProduct(createProduct: CreateProductDTO): Promise<ProductEntity> {
        await this.categoryService.findCategoryById(createProduct.categoryId);
    
        return this.productRepository.save({
          ...createProduct,
        });
    }

    async findAll(): Promise<ProductEntity[]> {
        const products = await this.productRepository.find();

        if(!products || products.length == 0) {
            throw new NotFoundException('Products not found')
        }
        
        return products
    }

    async findProductById(produtoId: number): Promise<ProductEntity>{
        const product = await this.productRepository.findOne({
            where: {
                id: produtoId
            }
        })

        if (!product) {
            throw new NotFoundException('Product not found.')
        }

        return product
    }

    async deleteProduct(productId: number):Promise<DeleteResult>{
        const product = await this.findProductById(productId);

        return this.productRepository.delete(product.id)
    }

    async updateProduct(updateProduct: UpdateProductDTO, productId: number): Promise<ProductEntity> {
        const product = await this.findProductById(productId);

        return this.productRepository.save({
            ...product,
            ...updateProduct
        })
    }
 }
