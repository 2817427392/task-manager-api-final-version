import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IoRedisClient from 'ioredis';
import test from 'node:test';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: IoRedisClient;
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService) {
    // Cria uma instância do cliente Redis
    this.client = new IoRedisClient(
      this.configService.get<string>(
        'REDIS_CACHE_URL', // URL do Redis
        'redis://localhost:6379', // valor padrão
      ),
      {
        enableOfflineQueue: false, // desativa fila offline
        db: +this.configService.get<string>('REDIS_CACHE_DATABASE', '0'), // seleciona o banco de dados
        retryStrategy(times) { // estratégia de tentativa de reconexão
          if (times >= 20) {
            return null; // para de tentar após 20 tentativas
          }

          return Math.min(times * 100, 2000); // espera crescente entre tentativas (até 2s)
        },
      },
    );
  }

  public onModuleInit() {
    // Evento de erro
    this.client.on('error', (error: Error) => {
      this.logger.error(error, `Erro no Redis: ${error.message}`);
    });

    // Evento de conexão
    this.client.on('connect', () => {
      this.logger.log('Redis conectado.');
    });

    // Evento de reconexão
    this.client.on('reconnecting', () => {
      this.logger.warn('Redis tentando reconectar.');
    });

    // Evento pronto
    this.client.on('ready', () => this.logger.log('Redis está pronto.'));
    
    // Evento de término da conexão
    this.client.on('end', () => this.logger.warn('Cliente Redis foi finalizado.'));
  }

  // Obtém um valor pelo chave:
  public async getOneTask(identificador: Number): Promise<any> {
    const teste = await this.client.get('tasks:all');

    if(!teste){
      return null;
    }

    let data: any[];
    data = JSON.parse(teste);

    const task = data.find(valor => valor.id === identificador);
    return task;
  }

  // Obtém todos os valores:
  public async getAllTasks(key: string): Promise<any> {
    const data = await this.client.get(key);
    return data? JSON.parse(data) : null;
  }

  // Define um valor pelo chave, com TTL opcional
  public async setOneTask(
    id: Number,
    value:any
  ): Promise <string | null> {
    return await this.client.set(id.toString(), String(value));
  }

  // Define vários valores:
 public async setAllTasks(
    key: string,
    value: any,
  ): Promise <string | null> {
    return await this.client.set(key, JSON.stringify(value));
  }

  // Deleta um valor pelo chave
  public async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  // Retorna a instância do cliente Redis
  public getClient(): IoRedisClient {
    return this.client;
  }
}
