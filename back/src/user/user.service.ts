import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, password }: CreateUserDto) {
    const findUser = await this.userRepository.findOne({ where: { email } });

    if (findUser) {
      throw new BadRequestException('User already exists!');
    }

    const hashPassword = await argon2.hash(password);

    const user = await this.userRepository.save({
      email,
      password: hashPassword,
    });

    return user;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
