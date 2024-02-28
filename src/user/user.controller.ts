import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUser():Promise<UserEntity[]> {
        return this.userService.getAllUsers()
    }
}
