import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Headers,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get(':id')
    async findUserById(
        @Param('id') id: string,
        @Headers('User-Password') password : string
    ): Promise<User> {
        return this.usersService.loadUserByCredential(id, password);
    }

    @Get()
    async users(): Promise<User[]> {
        return this.usersService.users();
    }

    @Post()
    async createUser(
        @Body() userData: { id: string, name?: string; password: string },
    ): Promise<User> {
        return this.usersService.createUser(userData);
    }
}