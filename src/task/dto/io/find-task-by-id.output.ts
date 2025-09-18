import { TaskStatus } from "@prisma/client";

export class FindTaskByIdOutputDTO {
  id: number;
  name: string;
  description?: string | null;
  statusId: number;
  status: TaskStatus; 
}
