import { IsNumber } from "class-validator";

export class insertCartDTO {
    
    @IsNumber()
    productId: number

    @IsNumber()
    amount: number
}
