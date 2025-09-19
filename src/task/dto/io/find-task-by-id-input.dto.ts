import { IsUUID } from "class-validator";

export class FindTaskByIdInputDTO {
  @IsUUID()
  id: number;
}
