import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/user';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, password);

    if (!user) {
      throw new UnauthorizedException('Wrong email!');
    }

    if (!passwordIsMatch) {
      throw new UnauthorizedException('Wrong password!');
    }

    return user;
  }

  async login({ id, email }: IUser) {
    return {
      id,
      email,
      access_token: this.jwtService.sign({ id, email }),
    };
  }
}
