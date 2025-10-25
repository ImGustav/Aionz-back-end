import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto"
import { CreateProdutoDto } from "../../dto/request/create-produto.dto"
import { UpdateProdutoDto } from "../../dto/request/update-produto.dto"
import { ResponseProdutos } from "../../dto/response/response-produto.dto"
import { PaginatedProductsResponseDto } from "src/shared/dto/paginated-response.dto"

export interface ProdutoServiceInterface {
    create(imageFileName: string, createProdutoDto: CreateProdutoDto): Promise<ResponseProdutos>
    findAll(query: PaginationQueryDto): Promise<PaginatedProductsResponseDto<ResponseProdutos>>
    findOne(id: number): Promise<ResponseProdutos>
    update(id: number, updateProdutoDto: UpdateProdutoDto, imageFileName?: string): Promise<ResponseProdutos>
    remove(id: number): Promise<void>
}