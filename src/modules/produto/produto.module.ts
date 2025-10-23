import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './domain/repositories/produto.repository';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ProdutoController],

  providers: [ProdutoService, ProdutoRepository],

  imports: [
    DatabaseModule,
    CategoryModule
  ]
})
export class ProdutoModule {}
