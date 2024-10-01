import { PrismaService } from "@common/services/prisma.service";
import { Injectable } from "@nestjs/common";
import bcrypt from 'bcrypt';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) { }

  async createUser(): Promise<void> {
    const password = await bcrypt.hash('test123', 10)
    await this.prismaService.user.create({
      data: {
        username: 'test',
        name: 'test',
        password
      }
    })
  }
} 
