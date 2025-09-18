import { Module } from "@nestjs/common";
import { 
  CreateTaskController,
  DeleteTaskController,
  FindTaskByIdController,
  FindTaskAllController
} 
from './controller';


import { 
  CreateTaskService,
  DeleteTaskService,
  FindTaskByIdService,
  FindTaskAllService
} 
from "./services";
import { RedisModule } from "./redis/redis.module";
import { UpdateTaskController } from "./controller/update-task.controller";
import { UpdateTaskService } from "./services/update-task.service";

@Module({
  imports: [
    RedisModule,
  ],
    controllers: [
      CreateTaskController,
      DeleteTaskController,
      FindTaskByIdController,
      FindTaskAllController,
      UpdateTaskController
    ],
    providers: [
    CreateTaskService,
    DeleteTaskService,
    FindTaskByIdService,
    FindTaskAllService,
    UpdateTaskService
  ]
})

export class TaskModule {}
