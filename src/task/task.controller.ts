import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Headers,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UsersService } from '../user/user.service';
import { Task,Prisma, User } from '@prisma/client';

@Controller('task')
export class TaskController {
    constructor(
        private readonly TaskService: TaskService,
        private readonly UsersService: UsersService,
    ) { }

    @Get(':id')
    async getTaskById(
        @Param('id') id: string,
    ): Promise<Task> {
        return this.TaskService.loadTaskById(id);
    }

    @Get()
    async getAllTaskOfUser(
        @Headers('User-Id') userId: string
    ): Promise<Task[]> {
        return this.TaskService.loadAllTasksOfUser(userId);
    }

    @Post()
    async createUser(
        @Body() taskData: Task,
    ): Promise<Task> {
        const userData : Promise<User> = this.UsersService.user(taskData.user_id)
        const taskCreateData : Prisma.TaskCreateInput = {
            ...taskData,
            User : await userData
        }
        // TODO TaskCreateInput 定義できてないの何とかする
        // TODO TaskCreateInput に必要な UserCreateNestedOneWithoutTasksInput の生成方法調査する
        return this.TaskService.createTask(taskData);
    }
}

