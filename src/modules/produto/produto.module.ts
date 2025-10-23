import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
