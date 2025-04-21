import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class productsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const newProduct = new Product();

    newProduct.name = createProductDto.name;

    await this.filesService.uploadFiles(files, newProduct);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['files'],
    });

    return await Promise.all(
      products.map(async (product) => {
        const updatedFiles = await Promise.all(
          product.files.map(async (file) => {
            const fileWithUrl = await this.filesService.getFile(file.id);
            return fileWithUrl;
          }),
        );
        console.log(process.memoryUsage());


        return {
          ...product,
          files: updatedFiles,
        };
      }),
    );
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
