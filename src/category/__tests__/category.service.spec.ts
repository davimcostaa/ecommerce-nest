import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,
        {provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            save: jest.fn().mockRejectedValue(categoryMock),
            findOne: jest.fn().mockResolvedValue(categoryMock)
          }
        }
      ]
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list category', async () => {
    const categories = await service.findAllCategories()

    expect(categories).toEqual([categoryMock])
  });

  it('should return error if list category is empty', async () => {

    jest.spyOn(categoryRepository, 'find').mockResolvedValue([])

    expect( service.findAllCategories()).rejects.toThrow()
  });

  it('should return error in list category exception', async () => {

    jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error())

    expect( service.findAllCategories()).rejects.toThrow()
  });

  // it('should return category after save', async () => {

  //   jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null);

  //   const category = await service.createCategory(createCategoryMock);

  //   expect(category.name).toEqual(createCategoryMock.name)
  // });

  it('should return after in exception', async () => {

    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error())

    expect(service.createCategory(createCategoryMock)).rejects.toThrow()
  });

  it('should return error if categoryname exists', async () => {
    expect(service.createCategory(categoryMock)).rejects.toThrow()
  });


  it('should return error if category is empty', async () => {

    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(null)

    expect(service.findCategoryByName(categoryMock.name)).rejects.toThrow()
  });

});
