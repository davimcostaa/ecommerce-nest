import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';

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

        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDTO.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDTO,
            typeUser: 1,
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

    async findUserByEmail(email: string): Promise<UserEntity> {
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
 }
