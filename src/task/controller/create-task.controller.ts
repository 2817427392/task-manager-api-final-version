import { BadRequestException, Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import type { CreateTaskRequestDTO } from "../dto/request/create-task-request.dto";
import type { CreateTaskOutputDTO } from "../dto/io/create-task-output.dto";
import { CreateTaskService } from "../services/create-task.service";

@Controller()
export class CreateTaskController {

  constructor(private readonly createTaskService: CreateTaskService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async handle(@Body() data: CreateTaskRequestDTO): Promise<CreateTaskOutputDTO> {
   if (!data.name) throw new BadRequestException('Ops! Informe qual o nome da tarefa :(')

    const result = await this.createTaskService.execute(data);
    return result;
    
  }
}
