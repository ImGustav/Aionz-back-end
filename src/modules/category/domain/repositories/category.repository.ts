import { PrismaService } from 'src/database/services/prisma.service';
import { CreateCategoryDto } from '../../dto/request/create-category.dto';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from '../../dto/request/update-category.dto';
import { CategoryRepositoryInterface } from '../interfaces/category-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategory: CreateCategoryDto): Promise<Category> {
    const createCat = await this.prisma.category.create({
      data: {
        ...createCategory,
      },
    });

    return createCat;
  }

  async findAll(): Promise<Category[]> {
    const allCat = await this.prisma.category.findMany();

    return allCat;
  }

  async findById(id: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({ where: { id } });

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({ where: { name } });

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const categoryToUpdate = await this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
      },
    });

    return categoryToUpdate;
  }

  async delete(id: number): Promise<Category> {
    const categoryToDelete = await this.prisma.category.delete({
      where: { id },
    });

    return categoryToDelete;
  }
}
