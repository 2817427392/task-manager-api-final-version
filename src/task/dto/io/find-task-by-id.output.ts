import { TaskStatus } from "@prisma/client";
import { IsEnum, IsIn, isString, IsString, IsUUID, MaxLength } from "class-validator";
import { TaskStatusEnum } from "src/shared";

export class FindTaskByIdOutputDTO {
  @IsUUID()
  id: number;

  @IsString()
  @MaxLength(256)
  name: string;

  @IsString()
  @MaxLength(512)
  description?: string | null;

  @IsIn([1,2,3])
  statusId: number;
  status: TaskStatus; 
}
