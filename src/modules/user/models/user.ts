import { PrismaService } from "@common/services/prisma.service";

export class User {
  constructor(
    private readonly prismaUser: PrismaService['user']
  ) { }

  static async toJson() {
    return 'oke';
  }
}
