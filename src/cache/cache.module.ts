// src/cache/cache.module.ts
import { Module } from '@nestjs/common';
import { CacheService } from 'src/cache.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
