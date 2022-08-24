import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user/user.service';
import { CommentService } from './comment/comment.service';
import { TaskService } from './task/task.service';
import { UsersController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { PrismaService } from './prisma.service'

@Module({
  imports: [UserModule, TaskModule, CommentModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, CommentService, TaskService, PrismaService],
})
export class AppModule { }
