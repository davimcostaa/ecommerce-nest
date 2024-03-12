import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/userType.enum";

export const userEntityMock: UserEntity = {
    cpf: '861.373.492-84',
    name: 'Cauê Francisco Matheus de Paula',
    createdAt: new Date(),
    email: 'cauefranciscodepaula@paulistadovale.org.br',
    id: 5,
    password: '$2b$10$lFk4n9Vkf6I1QHbrf6OWGO3MFJfcWz/XVDYM8oKYKj0v3IqoOgSPW',
    phone: '(97) 98104-6008',
    typeUser: UserType.User,
    updatedAt: new Date()

}