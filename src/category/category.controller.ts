import { Controller, Get, UsePipes, ValidationPipe, Post, Body } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userType.enum';
import { CategoryService } from './category.service';
import { createCategory } from './dtos/create-category.dto';
import { ReturnCategory } from './dtos/return-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ){}
    

    @Get()
    async findAllCategories(): Promise<ReturnCategory[]> {
        return (await this.categoryService.findAllCategories())
        .map((category) => new ReturnCategory(category))
    }

    @Roles(UserType.Admin, UserType.User)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(
        @Body() createCategory: createCategory
    ): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory)
    }

}
