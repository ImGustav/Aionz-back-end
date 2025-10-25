import { PrismaService } from 'src/database/services/prisma.service';
import { ProdutoRepositoryeInterface } from '../interfaces/produto-repository.interface';
import { Prisma, Product } from '@prisma/client';
import { UpdateProdutoDto } from '../../dto/request/update-produto.dto';
import { Injectable } from '@nestjs/common';
import { produtoRepositoryDto } from '../../dto/request/produto-repository.dto';

@Injectable()
export class ProdutoRepository implements ProdutoRepositoryeInterface {
  constructor(private readonly prisma: PrismaService) {}

  private buildSearchWhereClause(search?: string): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  async create(createProduct: produtoRepositoryDto): Promise<Product> {
    const productToCreate = await this.prisma.product.create({
      data: {
        ...createProduct,
      },
    });

    return productToCreate;
  }

  async findAll(
    limit: number,
    skip: number,
    search?: string,
  ): Promise<Product[]> {
    const where = this.buildSearchWhereClause(search);

    const allProducts = await this.prisma.product.findMany({
      where: where,
      include: { category: true },
      take: limit,
      skip: skip,
      orderBy: { name: 'asc' },
    });

    return allProducts;
  }

  async countProduct(search?: string): Promise<number> {
    const where = this.buildSearchWhereClause(search);

    return await this.prisma.product.count({ where: where });
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    return product;
  }

  async update(id: number, updateProduct: UpdateProdutoDto): Promise<Product> {
    const produtToUpdate = await this.prisma.product.update({
      where: { id },
      data: {
        ...updateProduct,
      },
    });

    return produtToUpdate;
  }

  async delete(id: number): Promise<Product> {
    const productToDelete = await this.prisma.product.delete({ where: { id } });

    return productToDelete;
  }
}
