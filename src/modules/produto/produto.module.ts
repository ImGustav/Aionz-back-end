import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './domain/repositories/produto.repository';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerConfigFactory } from 'src/config/multer.config';

@Module({
  controllers: [ProdutoController],

  providers: [ProdutoService, ProdutoRepository],

  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerConfigFactory,
      inject: [ConfigService],
    }),

    DatabaseModule,
    CategoryModule
  ]
})
export class ProdutoModule {}
