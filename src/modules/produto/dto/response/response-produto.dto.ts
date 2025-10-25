import { Exclude, Expose, Type } from 'class-transformer';

class ResponseCategorySimple {
  @Expose()
  id: number;
  @Expose()
  name: string;
}

@Exclude()
export class ResponseProdutos {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  image: string;

  @Expose()
  @Type(() => ResponseCategorySimple)
  category: ResponseCategorySimple;
}
