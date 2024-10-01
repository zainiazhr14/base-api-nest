import { z, ZodType } from "zod";

export class AuthValidation {
  static readonly Login: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100)
  });

  static readonly Register: ZodType = z.object({
    name: z.string().min(1).max(100),
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100)
  });
}
