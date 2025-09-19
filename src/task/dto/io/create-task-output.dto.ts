import { IsString, IsUUID, MaxLength } from "class-validator"

export class CreateTaskOutputDTO {
  @IsUUID()
  id: number; 

  @IsString()
  @MaxLength(256)
  name: string;
}
