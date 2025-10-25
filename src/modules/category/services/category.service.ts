import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from '../dto/request/create-category.dto'
import { UpdateCategoryDto } from '../dto/request/update-category.dto'
import { CategoryRepository } from '../domain/repositories/category.repository'
import { plainToInstance } from 'class-transformer'
import { ResponseCategory } from '../dto/response/response-category.dto'
import { CategoryServiceInterface } from '../domain/interfaces/category-service.interface'

@Injectable()
export class CategoryService implements CategoryServiceInterface {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategory> {
    const nameExist = await this.categoryRepository.findByName(
      createCategoryDto.name,
    )
    if (nameExist) {
      throw new ConflictException('Category with the same name already exist.')
    }

    const categoryToCreate =
      await this.categoryRepository.create(createCategoryDto)

    return plainToInstance(ResponseCategory, categoryToCreate, {
      excludeExtraneousValues: true,
    })
  }

  async findAll(): Promise<ResponseCategory[]> {
    const allCategories = await this.categoryRepository.findAll()

    return plainToInstance(ResponseCategory, allCategories, {
      excludeExtraneousValues: true,
    })
  }

  async findOne(id: number): Promise<ResponseCategory> {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundException('Category id not found.')
    }

    return plainToInstance(ResponseCategory, category, {
      excludeExtraneousValues: true,
    })
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategory> {
    const categoryExist = await this.categoryRepository.findById(id)
    if (!categoryExist) {
      throw new NotFoundException('Category id not found.')
    }

    if (updateCategoryDto.name) {
      const nameExist = await this.categoryRepository.findByName(
        updateCategoryDto.name,
      )
      if (nameExist && nameExist.id !== id) {
        throw new ConflictException(
          'Category with the same name already exist.',
        )
      }
    }

    const categoryToUpdate = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    )

    return plainToInstance(ResponseCategory, categoryToUpdate, {
      excludeExtraneousValues: true,
    })
  }

  async remove(id: number): Promise<void> {
    const categoryExist = await this.categoryRepository.findById(id)
    if (!categoryExist) {
      throw new NotFoundException('Category id not found.')
    }

    await this.categoryRepository.delete(id)
  }
}
