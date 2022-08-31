import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    async loadAllTasksOfUser(userId: string): Promise<Task[]> {
        return this.prisma.task.findMany(
            {
                where: {
                    user_id: userId
                }
            }
        );
    }

    async loadTaskById(
        id: string
    ): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });
        return task
    }

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({
            data,
        });
    }

    async updateTask(data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
            where: {
                id: data.id as string,
            },
            data: data
        })
    }
}

