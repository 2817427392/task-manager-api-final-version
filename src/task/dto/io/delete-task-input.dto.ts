import { IsUUID } from "class-validator";

export class DeleteTaskInputDTO {
  @IsUUID()
  id: number;
}
