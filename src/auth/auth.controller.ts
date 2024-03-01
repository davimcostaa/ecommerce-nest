import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDTO: LoginDTO): Promise<ReturnUserDTO> {
        return new ReturnUserDTO(await this.authService.login(loginDTO))
    } 
}
