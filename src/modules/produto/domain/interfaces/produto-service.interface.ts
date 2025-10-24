import { CreateProdutoDto } from "../../dto/request/create-produto.dto"
import { UpdateProdutoDto } from "../../dto/request/update-produto.dto"
import { ResponseProdutos } from "../../dto/response/response-produto.dto"

export interface ProdutoServiceInterface {
    create(imageFileName: string, createProdutoDto: CreateProdutoDto): Promise<ResponseProdutos>
    findAll(): Promise<ResponseProdutos[]>
    findOne(id: number): Promise<ResponseProdutos>
    update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<ResponseProdutos>
    remove(id: number): Promise<void>
}