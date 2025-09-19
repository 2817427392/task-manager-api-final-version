import { IsString, MaxLength } from "class-validator";

export class CreateTaskRequestDTO{
  @IsString()
  @MaxLength(256)
  name: string;

  @IsString()
  @MaxLength(512)
  description: string;
}
