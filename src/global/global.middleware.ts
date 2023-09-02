import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../auth/user/user.service';
import { AuthRepository } from '../auth/auth.repository';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  constructor(private readonly authRepository: AuthRepository, private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers?.authorization) {
      const token = req.headers?.authorization.split(' ')[1];
      const data = this.jwtService.decode(token);
      const id = data['subject'];
      const userExists = await this.userService.userExists(id);
      let user = {};
      if (userExists) {
        const userData = await this.authRepository.findOne({ id }, { username: true, email: true, id: true, role: true, verified: true });
        user = { ...userData };
      }
      req.user = user;
    }

    next();
  }
}
