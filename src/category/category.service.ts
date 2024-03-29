import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCategory } from './dtos/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ){}

    async findAllCategories(): Promise<CategoryEntity[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length == 0) {
            throw new NotFoundException('Categories is empty')
        }

        return categories
    }

    async findCategoryByName(name: string): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                name
            }
        })

        if (!category) {
            throw new NotFoundException('Category name not found.')
        }

        return category
    }

    async createCategory(createCategory: createCategory): Promise<CategoryEntity> {
        const category = await this.findCategoryByName(createCategory.name)
        .catch(() => undefined)

        if(category) {
            throw new BadRequestException('Category already exists.')
        }

        return this.categoryRepository.save(createCategory)
    }

    async findCategoryById(categoryId: number): Promise<CategoryEntity> {
        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new NotFoundException('Category id not found');
        }

        return category;
    }
    
}
