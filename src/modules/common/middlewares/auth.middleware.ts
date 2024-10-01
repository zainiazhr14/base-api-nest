import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configSevice: ConfigService
  ) { }

  async use(req: any, res: any, next: () => void) {
    let token = req.headers['Authorization'];
    if (token) {
      token = token.replace('Bearer ', '')
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configSevice.get('JWT_SECRET')
      }).catch(e => {
        return null;
      });

      if (user) {
        req.user = user
      }
    }
    next();
  }
}
