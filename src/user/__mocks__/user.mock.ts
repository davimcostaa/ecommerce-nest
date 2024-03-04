import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/userType.enum";

export const UserEntityMock: UserEntity = {
    cpf: '861.373.492-84',
    name: 'Cauê Francisco Matheus de Paula',
    createdAt: new Date(),
    email: 'cauefranciscodepaula@paulistadovale.org.br',
    id: 5665,
    password: 'password',
    phone: '(97) 98104-6008',
    typeUser: UserType.User,
    updatedAt: new Date()

}