import { IsString, IsUUID, MaxLength } from "class-validator";

export class DeleteTaskOutputDTO {
  @IsUUID()
  id: number;

  @IsString()
  @MaxLength(256)
  message: string;
}
