// src/product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity/product.entity';
import { ProductsService } from './product.service';
import { ProductsController } from './product.controller';
import { CacheService } from '../cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, CacheService],
})
export class ProductsModule {}
