import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: productsRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepo.create(createProductDto);
  }

  findAll() {
    return this.productsRepo.findAll()
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
