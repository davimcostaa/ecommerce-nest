import { Controller, Post, UsePipes, ValidationPipe, Param, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ){}

    @Post('/:userId') 
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body()
        createAddressDTO: CreateAddressDTO,
        @Param('userId') userId: number
        ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDTO, userId)
    }
}
