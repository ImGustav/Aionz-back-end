import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseProdutos {
  @Expose() 
  id: number;

  @Expose() 
  category_id: number;

  @Expose() 
  name: string;

  @Expose() 
  description: string;

  @Expose() 
  price: number;

  @Expose() 
  image: string;
}