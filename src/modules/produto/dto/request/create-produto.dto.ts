import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export class CreateProdutoDto {
    @IsNotEmpty()
    @IsString()
    category_id: number
    
    @IsNotEmpty()
    @IsString()
    @Min(3)
    @Max(20)
    name: string

    @IsString()
    @Min(3)
    @Max(50)
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsString()
    @Min(3)
    image: string
}
