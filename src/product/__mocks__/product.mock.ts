import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date(),
    id: 7384,
    image: 'http://ikmage',
    name: 'name product mock',
    price: 34.3,
    updatedAt: new Date()
}