import { CreateProdutoDto } from "../../dto/request/create-produto.dto"
import { UpdateProdutoDto } from "../../dto/request/update-produto.dto"

export interface ProdutoServiceInterface {
    create(createProdutoDto: CreateProdutoDto)
    findAll()
    findOne(id: number)
    update(id: number, updateProdutoDto: UpdateProdutoDto)
    remove(id: number)
}