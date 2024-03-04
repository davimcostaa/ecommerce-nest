import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CacheService } from '../../cache/cache.service';
import { Repository } from 'typeorm';
import { CityService } from '../city.service';
import { CityEntity } from '../entities/city.entity';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockRejectedValue({})
          }
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
          } 
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(getRepositoryToken(CityEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city ', async () => {

    const city = await service.findCityById(cityMock.id)

    expect(city).toEqual(cityMock)

    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return findOne error not found ', async () => {

    jest.spyOn

    const city = await service.findCityById(cityMock.id)

    expect(city).toEqual(cityMock)

    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return error findOne not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(null);

    expect(service.findCityById(cityMock.id)).rejects.toThrow();
  });

 
});
