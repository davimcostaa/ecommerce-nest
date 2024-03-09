import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from '../city/city.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity) 
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ){}

    async createAddress(
        createAddressDto: CreateAddressDTO,
        userId: number,
      ): Promise<AddressEntity> {
        await this.userService.findUserById(userId);
        await this.cityService.findCityById(createAddressDto.cityId);
    
        return this.addressRepository.save({
          ...createAddressDto,
          userId,
        });
      }
    }

