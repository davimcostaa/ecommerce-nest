import { UpdatePasswordDTO } from "../dtos/update-password.dto";

export const updatePasswordUserMock: UpdatePasswordDTO = {
    lastPassword: '123',
    newPassword: 'new'
}

export const updatePasswordInvalidUserMock: UpdatePasswordDTO = {
    lastPassword: 'wrong',
    newPassword: 'new'
}