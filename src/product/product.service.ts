// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity/product.entity';
import { CacheService } from '../cache.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly cache: CacheService,
  ) {}

  async getAll() {
    const key = 'products_all';
    const cached = await this.cache.get(key);

    if (cached) {
      console.log('Desde caché Redis');
      return JSON.parse(cached);
    }

    console.log('Consultando desde la base de datos...');
    const data = await this.productRepo.find();

    await this.cache.set(key, JSON.stringify(data), 20); // 20 segundos TTL
    console.log('Guardado en caché Redis');

    return data;
  }
}
