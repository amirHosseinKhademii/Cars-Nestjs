import { BadRequestException, Injectable } from '@nestjs/common';
import { encrypter } from 'src/utils/encrypter';
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
}
