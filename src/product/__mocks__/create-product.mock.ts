import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDTO } from "../dtos/create-product.dto";

export const createProductMock: CreateProductDTO = {
    categoryId: categoryMock.id,
    name: 'test',
    image: 'testmock.png',
    price: 100
}