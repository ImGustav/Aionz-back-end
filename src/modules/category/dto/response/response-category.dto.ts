import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class ResponseCategory {
  /**
   * ID da categoria de reposta
   */
  @Expose()
  id: number

  /**
   * Name da categoria de reposta
   */
  @Expose()
  name: string
}
