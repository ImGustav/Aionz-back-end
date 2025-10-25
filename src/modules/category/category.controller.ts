import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { CategoryService } from './services/category.service'
import { CreateCategoryDto } from './dto/request/create-category.dto'
import { UpdateCategoryDto } from './dto/request/update-category.dto'
import { ResponseCategory } from './dto/response/response-category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Criação de uma nova categoria.
   * @param createCategoryDto
   * @returns ResponseCategory
   */
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategory> {
    return this.categoryService.create(createCategoryDto)
  }

  /**
   * Encontrar todas as categorias.
   * @returns ResponseCategory[]
   */
  @Get()
  findAll(): Promise<ResponseCategory[]> {
    return this.categoryService.findAll()
  }

  /**
   * Encontrar uma categoria pelo id.
   * @param id
   * @returns ResponseCategory
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseCategory> {
    return this.categoryService.findOne(id)
  }

  /**
   * Atualizar uma categoria em específico.
   * @param id
   * @param updateCategoryDto
   * @returns ResponseCategory
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategory> {
    return this.categoryService.update(id, updateCategoryDto)
  }

  /**
   * Deletar uma categoria em específico
   * @param id
   * @returns
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoryService.remove(id)
  }
}
