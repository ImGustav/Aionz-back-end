import { Product } from "@prisma/client"
import { CreateProdutoDto } from "../../dto/request/create-produto.dto"
import { UpdateProdutoDto } from "../../dto/request/update-produto.dto"

export interface ProdutoRepositoryeInterface {
    create(createProduct: CreateProdutoDto): Promise<Product>
    findAll(): Promise<Product[]>
    findById(id: number): Promise<Product | null>
    update(id: number, updateProduct: UpdateProdutoDto): Promise<Product>
    delete(id: number): Promise<Product>
}