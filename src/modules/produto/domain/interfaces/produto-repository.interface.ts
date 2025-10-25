import { Product } from "@prisma/client"
import { CreateProdutoDto } from "../../dto/request/create-produto.dto"
import { UpdateProdutoDto } from "../../dto/request/update-produto.dto"

export interface ProdutoRepositoryeInterface {
    create(createProduct: CreateProdutoDto): Promise<Product>
    findAll(limit: number, skip: number, search?: string): Promise<Product[]>
    countProduct(search?:string): Promise<number>
    findById(id: number): Promise<Product | null>
    update(id: number, updateProduct: UpdateProdutoDto): Promise<Product>
    delete(id: number): Promise<Product>
}