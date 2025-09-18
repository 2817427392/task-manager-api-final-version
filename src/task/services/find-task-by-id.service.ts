import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/database/services/prisma.service";
import { FindTaskByIdOutputDTO } from "../dto/io/find-task-by-id.output";
import { FindTaskByIdInputDTO } from "../dto/io/find-task-by-id-input.dto";
import { RedisService } from "../redis/services/redis.service";

@Injectable()
export class FindTaskByIdService {
  constructor(private readonly prismaService: PrismaService,
  private readonly redisService: RedisService) {};

  public async execute({id}: FindTaskByIdInputDTO): Promise<FindTaskByIdOutputDTO> {
    const redisValue = await this.redisService.getOneTask(id);
    if(redisValue){
      return redisValue;
    }
 
    const taskExists = await this.prismaService.task.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        statusId: true,
        createdAt: true,
        updatedAt: true,
        status: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });
    if (!taskExists) throw new NotFoundException('Tarefa não encontrada');

    return taskExists
  }
}
