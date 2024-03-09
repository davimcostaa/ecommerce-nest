import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userType.enum';
import { ReturnProduct } from './dtos/return-product.dto';
import { ProductService } from './product.service';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {


    constructor(
        private readonly productService: ProductService
    ){}

    @Get()
    async findAll(): Promise<ReturnProduct[]> {
        return (await this.productService.findAll()).map((product) => new ReturnProduct(product))
    }
}
