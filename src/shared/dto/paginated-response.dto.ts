import { IsArray, IsNumber } from 'class-validator'

export class PaginatedResponseDto<TData> {
  @IsArray()
  data: TData[]

  @IsNumber()
  total: number

  constructor(data: TData[], total: number) {
    ;((this.data = data), (this.total = total))
  }
}
