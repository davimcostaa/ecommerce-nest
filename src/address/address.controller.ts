import { Controller, Post, UsePipes, ValidationPipe, Param, Body, Get } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/userType.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { ReturnAddressDTO } from './dtos/returnAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ){}

    @Post() 
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body()
        createAddressDTO: CreateAddressDTO,
        @UserId() userId: number
        ): Promise<AddressEntity> {
        return this.addressService.createAddress(createAddressDTO, userId)
    }

    @Get() 
    async findAddressByUserId(
        @UserId() userId: number
        ): Promise<ReturnAddressDTO[]> {
        return (await this.addressService.findAddressByUserId(userId)).map((address) => new ReturnAddressDTO(address))
    }
}
