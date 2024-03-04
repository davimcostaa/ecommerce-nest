import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDTO: LoginDTO): Promise<ReturnLogin> {
        return await this.authService.login(loginDTO)
    } 
}
