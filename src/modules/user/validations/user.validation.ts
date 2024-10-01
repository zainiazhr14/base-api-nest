import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(30),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
  });
}
