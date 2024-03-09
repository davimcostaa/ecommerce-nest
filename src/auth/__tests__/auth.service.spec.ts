import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtMock } from '../__mocks__/jwt.mock';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { ReturnUserDTO } from '../../user/dtos/returnUser.dto';


describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock)
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => JwtMock
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: JwtMock,
      user: new ReturnUserDTO(userEntityMock),
    });
  });

  it('should return error if password invalid and email valid', async () => {
    expect(service.login({...loginUserMock, password: '4312'}),
    ).rejects.toThrow()
  });

  it('should return error if email not exist', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(undefined)

    expect(service.login(loginUserMock)).rejects.toThrow()
    
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error())

    expect(service.login(loginUserMock)).rejects.toThrow()
    
  });

})

