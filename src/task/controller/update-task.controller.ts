import { Controller, HttpCode, HttpStatus, Put, Body, ConflictException } from "@nestjs/common";
import { UpdateTaskService } from "../services/update-task.service";
import type { UpdateTaskRequestDTO } from "../dto/request/update-task-request.dto";
import type { UpdateTaskOutputDTO } from "../dto/io/update-task-output.dto";


@Controller()
export class UpdateTaskController{

  constructor(private readonly updateTaskService: UpdateTaskService){}

  @HttpCode(HttpStatus.CREATED)
  @Put()
  public async handle(@Body() data: UpdateTaskRequestDTO): Promise<UpdateTaskOutputDTO>{
    if(!data.id) throw new ConflictException('É necessário indicar o id para alterar o valor')
    if(!data.name){
      data.name = '';
    }
    if(!data.description){
      data.description = '';
    }
    if(!data.statusId){
      data.statusId = 0;
    }
    

    const result = await this.updateTaskService.execute(data);
    return result;
  }
}
