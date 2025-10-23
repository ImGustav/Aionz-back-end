import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/request/create-produto.dto';
import { UpdateProdutoDto } from '../dto/request/update-produto.dto';
import { ProdutoServiceInterface } from '../domain/interfaces/produto-service.interface';
import { ResponseProdutos } from '../dto/response/response-produto.dto';
import { ProdutoRepository } from '../domain/repositories/produto.repository';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ProdutoService{
  constructor(
    private readonly produtoRepository: ProdutoRepository
  ){}

  // create(createProdutoDto: CreateProdutoDto) {
  //   return 'This action adds a new produto';
  // }

  async findAll(): Promise<ResponseProdutos[]> {
    const allProducts = await this.produtoRepository.findAll()

    return plainToInstance(ResponseProdutos, allProducts, {
      excludeExtraneousValues: true
    })
  }

  async findOne(id: number) {
    const productExist = await this.produtoRepository.findById(id)
    if(!productExist){
      throw new NotFoundException("Product id not found.")
    }

    return plainToInstance(ResponseProdutos, productExist, {
      excludeExtraneousValues: true
    })
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  async remove(id: number): Promise<void> {
    const productExist = await this.produtoRepository.findById(id)
    if(!productExist){
      throw new NotFoundException("Product id not found.")
    }

    await this.produtoRepository.delete(id)
  }
}
