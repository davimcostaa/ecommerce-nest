import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDTO } from "../dtos/create-product.dto";
import { UpdateProductDTO } from "../dtos/update-product";

export const updateProductMock: UpdateProductDTO = {
    categoryId: categoryMock.id,
    name: 'test2',
    image: 'testmock.png',
    price: 100
}