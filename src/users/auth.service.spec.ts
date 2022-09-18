import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AUTH SERVICE', () => {
  const fakeUserService: Partial<UsersService> = {
    find: (): Promise<User[]> =>
      Promise.resolve([
        //{ id: 20, email: 'test', password: 'test' }
      ]),
    create: (email: string, password: string): Promise<User> =>
      Promise.resolve({ id: 10, email, password }),
  };

  let service: AuthService;

  beforeEach(async () => {
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
    expect(user.id).toBe(10);
  });
});
