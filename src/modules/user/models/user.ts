import { PrismaService } from '@common/services/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserResponse } from '@user/interfaces/user.interface';
import { createPaginator } from 'utility/paginator';

export class UserModel {
  constructor() {}

  static async findAll(
    prisma: PrismaService,
    query: {
      limit?: number;
      page?: number;
    },
    additionalQuery?: Prisma.UserFindManyArgs,
  ) {
    const paginate = createPaginator({
      perPage: query.limit || 10,
      page: query.page || 1,
    });

    const result = await paginate<User, Prisma.UserFindManyArgs>(prisma.user, {
      orderBy: {
        created_at: 'desc',
      },
      ...additionalQuery,
    });

    return result;
  }

  static async toJson(
    prisma: PrismaService,
    additionalQuery: Prisma.UserFindUniqueArgs,
  ): Promise<UserResponse> {
    const user: User = await prisma.user.findUnique({
      ...additionalQuery,
    });

    return user;
  }
}
