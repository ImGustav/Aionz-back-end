import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/request/create-produto.dto';
import { UpdateProdutoDto } from '../dto/request/update-produto.dto';
import { ProdutoServiceInterface } from '../domain/interfaces/produto-repository.interface';


@Injectable()
export class ProdutoService implements ProdutoServiceInterface {
  create(createProdutoDto: CreateProdutoDto) {
    return 'This action adds a new produto';
  }

  findAll() {
    return `This action returns all produto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
