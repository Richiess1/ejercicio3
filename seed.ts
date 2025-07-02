// seed.ts
import { DataSource } from 'typeorm';
import { Product } from 'src/product/product.entity/product.entity';


const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'suser',
  database: 'ejercicio3',
  entities: [Product],
  synchronize: false, // no debe crearte tablas aquí
});

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Product);

  const products = Array.from({ length: 1000 }).map((_, i) =>
    repo.create({
      name: `Product ${i + 1}`,
      price: +(Math.random() * 100).toFixed(2),
    })
  );

  await repo.save(products);
  console.log('-- 1000 productos insertados');
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
