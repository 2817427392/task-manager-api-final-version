import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/services/prisma.service";
import { FindTaskAllOutputDTO } from "../dto/io/find-task-all-output.dto";
import { RedisService } from "../redis/services/redis.service";

@Injectable()
export class FindTaskAllService {

  constructor (private readonly prismaService: PrismaService, 
    private readonly redisService: RedisService) {
  }

  public async execute(): Promise<any>{
 
    const keyName = "tasks:all";
    const redisValues = await this.redisService.getAllTasks(keyName);

    if (redisValues) {
      return redisValues;
    }else{
      const tasks = await this.prismaService.task.findMany({
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
              name: true,
            }
          }
        }     
      });

      this.redisService.setAllTasks(keyName, tasks);

      return {
        data: tasks.map(task => ({
          id: task.id,
          name: task.name,
          description: task.description || null,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          statusId: task.statusId, 
          status: task.status
        })),
      };
    }
  }
} 
