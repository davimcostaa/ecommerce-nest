import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPasswordHashed, validatePassword } from '../utils/password';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/userType.enum';

@Injectable()
export class UserService {



    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {

        const user = await this.findUserByEmail(createUserDTO.email).catch(() => undefined)

        if(user) {
            throw new BadRequestException('email registered in system')
        }
        const passwordHashed = await createPasswordHashed(createUserDTO.password)

        return this.userRepository.save({
            ...createUserDTO,
            typeUser: UserType.User,
            password: passwordHashed
        })
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                addresses: {
                    city: {
                        state: true
                    }
                }
            }
        })

        if (!user) {
            throw new NotFoundException
        }

        return user
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find()
    } 

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new NotFoundException('UserId not found!')
        }

        return user
    }

    async findUserByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new NotFoundException('Email not found!')
        }

        return user
    }

    async updatePasswordUser(
            updatePasswordUser: UpdatePasswordDTO, 
            userId: number): Promise<UserEntity> {
        const user = await this.findUserById(userId);

        const newPasswordHashed = 
            await createPasswordHashed(updatePasswordUser.newPassword);

        const isMatch = await validatePassword(updatePasswordUser.lastPassword, user.password || '')    

        if (!isMatch) {
            throw new BadRequestException('Password invalid')
        }
        return this.userRepository.save({
            ...user,
            password: newPasswordHashed
        })    

    }
 }
