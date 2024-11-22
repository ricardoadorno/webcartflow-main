import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class AddProductDto {

    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNumber()
    @Min(0)
    @Max(20)
    quantity: number;
}