import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {

    constructor( 
        private readonly userService: UserService,
        private jwtService: JwtService
        ){}

    async login(loginDTO: LoginDTO): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService.findUserByEmail(loginDTO.email)
        .catch(() => undefined);
        
        const isMatch = compare(loginDTO.password, user?.password || '');

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid')
        }

        return {
            accessToken: await this.jwtService.signAsync({...new LoginPayload(user)}),
            user: new ReturnUserDTO(user)
        }

    }
}
