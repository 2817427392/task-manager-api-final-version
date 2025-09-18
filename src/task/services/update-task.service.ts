import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/services/prisma.service";
import { RedisService } from "../redis/services/redis.service";
import { UpdateTaskInput } from "../dto/io/update-task-input.dto.io";

@Injectable()
export class UpdateTaskService{
  constructor(private readonly prismaService: PrismaService,
  private readonly redisService: RedisService){};

  public async execute({id, name, description, statusId}: UpdateTaskInput){
    const redisValues = await this.redisService.getOneTask(id);

    if (redisValues===null){
      const prismaValues = await this.prismaService.task.findFirst({
        where:{
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          statusId: true,
        },
      })

      if (prismaValues===null) throw new ConflictException("Ops, esta atividade não está registrada");
    }

    this.redisService.delete("tasks:all");
    
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (description) {
      data.description = description;
    }

    if (statusId) {
      data.statusId = statusId;
    }

    return this.prismaService.task.update({
      where: {
        id: id,
      },
      data,
      select: {
        id: true, 
        name: true,
        description: true,
        statusId: true
      }
    })
  }
}
