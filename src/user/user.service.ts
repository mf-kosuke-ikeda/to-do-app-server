import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async user(
        id: string,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async users(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async loadUserByCredential(
        id: string,
        password: string
    ): Promise<User | null> {
        const user = await this.user(id);
        if (user.password === password) {
            return user;
        } else {
            return null;
        }
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }
}
