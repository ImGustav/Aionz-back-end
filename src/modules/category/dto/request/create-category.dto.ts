import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    /**
     * Esse campo se refere ao nome da categoria.
     */
    @IsNotEmpty()
    @IsString()
    name: string
}
