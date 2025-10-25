import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  category_id: number;

  @IsNotEmpty()
  @IsString()
  // @Min(10)
  // @Max(50)
  name: string;

  @IsOptional()
  @IsString()
  // @Min(10)
  // @Max(70)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  // @IsNotEmpty()
  // @IsString()
  // @Min(3)
  // image: string
}
