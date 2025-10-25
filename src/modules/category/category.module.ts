import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './domain/repositories/category.repository';
import { CategoryService } from './services/category.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CategoryController],

  providers: [CategoryService, CategoryRepository],

  exports: [CategoryRepository],

  imports: [DatabaseModule],
})
export class CategoryModule {}
