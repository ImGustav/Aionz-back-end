import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { CreateProdutoDto } from './dto/request/create-produto.dto';
import { UpdateProdutoDto } from './dto/request/update-produto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigFactory } from 'src/config/multer.config';


@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProdutoDto: CreateProdutoDto
  ) 
  {
    if (!file) {
      throw new BadRequestException('O arquivo de imagem é obrigatório.');
    }

    return this.produtoService.create(file.filename, createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
