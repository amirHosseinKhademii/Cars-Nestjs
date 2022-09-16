import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Serializer } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serializer(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() { email, password }: CreateUserDto) {
    return this.authService.signup(email, password);
  }

  @Get('/:id')
  findUser(@Param() { id }: { id: string }) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param() { id }: { id: string }) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param() { id }: { id: string }, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
