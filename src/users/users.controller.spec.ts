import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  const users: User[] = [
    { id: 123456, email: 'test@gmail.com', password: 'test' },
  ];

  beforeEach(async () => {
    fakeUserService = {
      findOne: (id: number): Promise<User> =>
        Promise.resolve(users.find((user) => user.id === id)),
      find: (email: string): Promise<User[]> =>
        Promise.resolve(users.filter((user) => user.email === email)),
      // create: (email: string, password: string): Promise<User> => {
      //   const user = { id: users.length + 1, email, password };
      //   users.push(user);
      //   return Promise.resolve(user);
      // },
      // remove: (id: number) =>
      //   Promise.resolve(users.find((user) => user.id === id)),
      // update: (id: number, {}) =>
      //   Promise.resolve(users.find((user) => user.id === id)),
    };

    fakeAuthService = {
      // signin: (): Promise<User> => Promise.resolve({}),
      // signup: (): Promise<User> => Promise.resolve({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUserService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all users', async () => {
    const usersReturn = await controller.findUsers('test@gmail.com');
    expect(usersReturn).toStrictEqual(users);
  });

  it('should find a user', async () => {
    const userReturn = await controller.findUser({ id: '123456' });
    expect(userReturn).toStrictEqual(users[0]);
  });
});
