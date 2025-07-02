import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({ url: 'redis://localhost:6379' });

    this.client.on('error', (err) => console.error('Redis Client Error:', err));

    await this.client.connect();
    console.log('Conectado a Redis');
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.disconnect();
      console.log('Redis desconectado');
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Error al obtener desde Redis:', err);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    try {
      await this.client.set(key, JSON.stringify(value), { EX: ttlSeconds });
    } catch (err) {
      console.error('Error al guardar en Redis:', err);
    }
  }
}
