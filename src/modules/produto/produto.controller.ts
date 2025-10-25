import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { ProdutoService } from './services/produto.service'
import { CreateProdutoDto } from './dto/request/create-produto.dto'
import { UpdateProdutoDto } from './dto/request/update-produto.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { ResponseProdutos } from './dto/response/response-produto.dto'
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto'
import { PaginatedResponseDto } from 'src/shared/dto/paginated-response.dto'

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  /**
   * Criação de um novo produto com upload de imagem.
   * A requisição deve ser 'multipart/form-data'.
   * @param file O arquivo de imagem (enviado no campo 'image').
   * @param createProdutoDto
   * @returns ResponseProdutos
   */
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<ResponseProdutos> {
    if (!file) {
      throw new BadRequestException('O arquivo de imagem é obrigatório.')
    }
    return this.produtoService.create(file.filename, createProdutoDto)
  }

  /**
   * Encontrar todos os produtos.
   * @returns ResponseProdutos[]
   */
  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<ResponseProdutos>> {
    return this.produtoService.findAll(paginationQuery)
  }

  /**
   * Encontrar um produto pelo id.
   * @param ID do produto.
   * @returns ResponseProdutos
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseProdutos> {
    return this.produtoService.findOne(id)
  }

  /**
   * Atualizar um produto em específico.
   * @param id O ID do produto.
   * @param updateProdutoDto
   * @returns ResponseProdutos
   */
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<ResponseProdutos> {
    return this.produtoService.update(id, updateProdutoDto, file?.filename)
  }

  /**
   * Deletar um produto em específico.
   * @param ID do produto.
   * @returns Promise<void>
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produtoService.remove(id)
  }
}
