// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './product/product.module';
import { CacheService } from './cache.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suser',
      database: 'ejercicio3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    ProductsModule,
  ],
  providers: [CacheService], // registra tu servicio personalizado aquí
  exports: [CacheService], // para que esté disponible a otros módulos
})
export class AppModule {}
