import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { CommentService } from './comment/comment.service';
import { TaskService } from './task/task.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, TaskModule, CommentModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, CommentService, TaskService],
})
export class AppModule {}
