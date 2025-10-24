import { PrismaService } from "src/database/services/prisma.service";
import { ProdutoRepositoryeInterface } from "../interfaces/produto-repository.interface";
import { Product } from "@prisma/client";
import { UpdateProdutoDto } from "../../dto/request/update-produto.dto";
import { Injectable } from "@nestjs/common";
import { produtoRepositoryDto } from "../../dto/request/produto-repository.dto";

@Injectable()
export class ProdutoRepository implements ProdutoRepositoryeInterface{
    constructor( private readonly prisma: PrismaService ){}

    async create(createProduct: produtoRepositoryDto): Promise<Product> {
        const productToCreate = await this.prisma.product.create({
            data: {
                ...createProduct
            }
        })

        return productToCreate
    }

    async findAll(): Promise<Product[]> {
        const allProducts = await this.prisma.product.findMany()

        return allProducts
    }

    async findById(id: number): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({ where: { id } })

        return product
    }

    async update(id: number, updateProduct: UpdateProdutoDto): Promise<Product> {
        const produtToUpdate = await this.prisma.product.update({
            where: {id},
            data: {
                ...updateProduct
            }
        })

        return produtToUpdate
    }

    async delete(id: number): Promise<Product> {
        const productToDelete = await this.prisma.product.delete({ where: { id } })

        return productToDelete
    }
}