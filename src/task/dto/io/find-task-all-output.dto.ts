import { TaskStatus } from "@prisma/client";

export interface FindTaskAllOutputDTO {
  data: Array<{
  id: number,
  name: string,
  description?: string | null,
  statusId: number,
  createdAt: Date,
  updatedAt: Date,
  status: TaskStatus
  }>
};
