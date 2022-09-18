import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { encrypter, hasher } from '../utils/encrypter';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users?.length) throw new BadRequestException('Email already exist.');
    const hashed = await encrypter(password);
    return await this.userService.create(email, hashed);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) throw new NotFoundException('Email does not exist.');
    const [salt, hash] = user.password.split('.');
    const pass = await hasher(password, salt);
    if (pass.toString('hex') !== hash)
      throw new BadRequestException('Password is wrong.');
    return user;
  }
}
