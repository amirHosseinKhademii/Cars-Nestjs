import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AUTH SERVICE', () => {
  let fakeUserService: Partial<UsersService>;
  let service: AuthService;
  const users: User[] = [];

  beforeEach(async () => {
    fakeUserService = {
      find: (email: string): Promise<User[]> =>
        Promise.resolve(users.filter((user) => user.email === email)),
      create: (email: string, password: string): Promise<User> => {
        const user = { id: Math.random(), email, password };
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('Create an instanse of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Sign up should work as expected', async () => {
    const email = 'amir@gmail.com';
    const password = '12345';
    const user = await service.signup(email, password);
    const [salt, hash] = user.password.split('.');
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Sign up should not work with in use email', async () => {
    const email = 'amir@gmail.com';
    const password = '12345';
    try {
      await service.signup(email, password);
    } catch (error) {
      expect(error.response).toStrictEqual({
        statusCode: 400,
        message: 'Email already exist.',
        error: 'Bad Request',
      });
    }
  });

  it('Sign in should work as expected and return user', async () => {
    const email = 'amir@gmail.com';
    const password = '12345';
    const user = await service.signin(email, password);
    expect(user.email).toBe(email);
  });

  it('Sign in should work as expected', async () => {
    const email = 'amir@gmail.com';
    const password = '12345';
    try {
      await service.signin(email, password);
    } catch (error) {
      expect(error.response).toStrictEqual({
        statusCode: 400,
        message: 'Password is wrong.',
        error: 'Bad Request',
      });
    }
  });

  it('Sign in should not work as expected', async () => {
    const email = 'amir@gmail.com';
    const password = '12345';
    try {
      await service.signin(email, password);
    } catch (error) {
      expect(error.response).toStrictEqual({
        statusCode: 404,
        message: 'Email does not exist.',
        error: 'Not Found',
      });
    }
  });
});
