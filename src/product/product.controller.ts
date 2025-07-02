import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './product.service';
import { Product } from './product.entity/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.getAll();
  }
}
