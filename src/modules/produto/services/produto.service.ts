import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/request/create-produto.dto';
import { UpdateProdutoDto } from '../dto/request/update-produto.dto';
import { ProdutoServiceInterface } from '../domain/interfaces/produto-service.interface';
import { ResponseProdutos } from '../dto/response/response-produto.dto';
import { ProdutoRepository } from '../domain/repositories/produto.repository';
import { plainToInstance } from 'class-transformer';
import { CategoryRepository } from 'src/modules/category/domain/repositories/category.repository';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { PaginatedProductsResponseDto } from 'src/shared/dto/paginated-response.dto';


@Injectable()
export class ProdutoService implements ProdutoServiceInterface{
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly categoriaRepository: CategoryRepository
  ){}

  async create(imageFileName: string, createProdutoDto: CreateProdutoDto): Promise<ResponseProdutos> {
    const pathImage = `/uploads/${imageFileName}`

    const categoryExist = await this.categoriaRepository.findById(createProdutoDto.category_id)
    if(!categoryExist){
      throw new NotFoundException("Category id not found.")
    }

    const data = {
      ...createProdutoDto,
      image: pathImage
    }

    const productToCreate = await this.produtoRepository.create(data)

    return plainToInstance(ResponseProdutos, productToCreate, {
      excludeExtraneousValues: true
    })
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedProductsResponseDto<ResponseProdutos>> {
    const { page, limit, search } = query
    const skip = (page - 1) * limit

    const [total, productList] = await Promise.all([
      this.produtoRepository.countProduct(search),
      this.produtoRepository.findAll(limit, skip, search)
    ])

    const productsDto = productList.map(products =>
      plainToInstance(ResponseProdutos, products, {excludeExtraneousValues: true})
    )

    return new PaginatedProductsResponseDto(productsDto, total)
  }

  async findOne(id: number): Promise<ResponseProdutos> {
    const productExist = await this.produtoRepository.findById(id)
    if(!productExist){
      throw new NotFoundException("Product id not found.")
    }

    return plainToInstance(ResponseProdutos, productExist, {
      excludeExtraneousValues: true
    })
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto, imageFileName?: string): Promise<ResponseProdutos> {
    const productExist = await this.produtoRepository.findById(id)
    if(!productExist){
      throw new NotFoundException("Product id not found.")
    }

    if(updateProdutoDto.category_id){
      const categoryExist = await this.categoriaRepository.findById(updateProdutoDto.category_id)
      if(!categoryExist){
        throw new NotFoundException("Category id not found.")
      }
    }

    const data: Record<string,any> = {
      ...updateProdutoDto,
    }

    if(imageFileName){
      const pathImage = `/uploads/${imageFileName}`
      data.image = pathImage
    }

    const productToUpdate = await this.produtoRepository.update(id, data)

    return plainToInstance(ResponseProdutos, productToUpdate, {
      excludeExtraneousValues: true
    })
  }

  async remove(id: number): Promise<void> {
    const productExist = await this.produtoRepository.findById(id)
    if(!productExist){
      throw new NotFoundException("Product id not found.")
    }

    await this.produtoRepository.delete(id)
  }
}
