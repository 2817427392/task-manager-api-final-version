import { IsString, MaxLength } from "class-validator";

export class CreateTaskInputDTO {
  @IsString()
  @MaxLength(256)
  name: string

  @IsString()
  @MaxLength(512)
  description: string;
}
