import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Patch } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateUserDTO } from './dtos/createUser.dto';
import { ReturnUserDTO } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/userType.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Roles(UserType.Admin)
    @Get()
    async getAllUser():Promise<ReturnUserDTO[]> {
        return (await this.userService.getAllUsers()).map(
            (userEntity) => new ReturnUserDTO(userEntity))
    }

    @Roles(UserType.Admin)
    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDTO> {
        return new ReturnUserDTO(await this.userService.getUserByIdUsingRelations(userId));
    }

    @Roles(UserType.Admin, UserType.User)
    @Patch()
    async updateUserPassword(
        @UserId() userId: number,
        @Body() updateUserPassword: UpdatePasswordDTO
    ):Promise<UserEntity> {
        return this.userService.updatePasswordUser(updateUserPassword, userId)
    }

}
