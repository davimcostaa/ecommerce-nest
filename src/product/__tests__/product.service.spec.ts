import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../product.service';
import { createProductMock } from '../__mocks__/create-product.mock';
import { productMock } from '../__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,
        {
          provide: CategoryService, 
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock)
          }
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            findOne: jest.fn().mockResolvedValue(productMock),
            save:  jest.fn().mockResolvedValue(productMock),
            delete:  jest.fn().mockResolvedValue(returnDeleteMock)
          }
        }]
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
    categoryService = module.get<CategoryService>(CategoryService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return all products ', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
  });

  
  it('should return error if products empty ', async () => {

    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toThrow();

  });

  it('should return error in expection ', async () => {

    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());
    expect(service.findAll()).rejects.toThrow();

  });

  it('should return product after insert in DB', async () => {

    const product = await service.createProduct(createProductMock)
  
    expect(product).toEqual(productMock)

  });

  it('should return product after insert in DB', async () => {

    jest.spyOn(categoryService, 'findCategoryById').mockRejectedValue(new Error())

  
    expect(service.createProduct(createProductMock)).rejects.toThrow();

  });

  it('should return product in find by id', async () => {

    const product = await service.findProductById(productMock.id)

    expect(product).toEqual(productMock)

  });

  it('should return error if product not found in find by id', async () => {

    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null)

    expect(service.findProductById(productMock.id)).rejects.toThrow()

  });

  
  it('should return true if product deleted', async () => {

    const deleted = await service.deleteProduct(productMock.id)

    expect(deleted).toEqual(returnDeleteMock)

  });

  it('should return product after update', async () => {

    const product = await service.updateProduct(updateProductMock, productMock.id)

    expect(product).toEqual(productMock)

  });

  it('should return error in update product', async () => {

    jest.spyOn(productRepository, 'save').mockRejectedValue(new Error())

    expect(service.updateProduct(productMock, productMock.id)).rejects.toThrow()

  });


});
