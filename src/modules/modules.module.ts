import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { ProdutoModule } from './produto/produto.module'

@Module({
  imports: [CategoryModule, ProdutoModule],
})
export class ModulesModule {}
