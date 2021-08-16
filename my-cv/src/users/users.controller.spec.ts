import { UsersService } from './users.service';
import { User } from './../reports/user.entity';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'tja@hotmail.com',
          password: '121212',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: '121212',
          } as User,
        ]);
      },
      // remove: () => { },
      // update: () => { }
    };
    fakeAuthService = {
      // signup: () => { },
      signin: (email: string, password: string) => {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAllUsers should return email', async () => {
    const users = await controller.findAllUsers('tja@hotmail.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('tja@hotmail.com');
  });

  it('should return user with id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('can throw error when finduser id is missing', async (done) => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findUser('1');
    } catch (error) {
      done();
    }
  });

  it('should signin, update session and return user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'tja@hotmail.com', password: '121212' },
      session ,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  });
});
