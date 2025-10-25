import { Category } from '@prisma/client'
import { CreateCategoryDto } from '../../dto/request/create-category.dto'
import { UpdateCategoryDto } from '../../dto/request/update-category.dto'

export interface CategoryRepositoryInterface {
  create(createCategory: CreateCategoryDto): Promise<Category>
  findAll(): Promise<Category[]>
  findById(id: number): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>
  delete(id: number): Promise<Category>
}
