import { Controller, Post, UsePipes, ValidationPipe, Param, Body } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/userType.enum';
import { AddressService } from './address.service';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ){}

    @Roles(UserType.User)
    @Post() 
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body()
        createAddressDTO: CreateAddressDTO,
        @UserId() userId: number
        ): Promise<AddressEntity> {
            console.log(userId)
        return this.addressService.createAddress(createAddressDTO, userId)
    }
}
