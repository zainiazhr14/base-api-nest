import { PrismaService } from '@common/services/prisma.service';
import { User } from '@graphql/models/user.model';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
