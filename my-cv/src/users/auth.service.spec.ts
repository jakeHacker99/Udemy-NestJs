import { ReportsModule } from './../reports/reports.module';
import { User } from './../reports/user.entity';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter((user) => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 9999), email, password } as User

                users.push(user);
                return Promise.resolve(user)
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });
    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });
    it('creates a new user with hash+ salt', async () => {
        const user = await service.signup('shu@hotmail.com', '123shu123');
        expect(user.password).not.toEqual('123shu123');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws error on busy email', async (done) => {
        await service.signup('shu@hotmail.com', '123shu123');

        try {
            await service.signup('shu@hotmail.com', '123shu123');
        } catch (error) {
            done();
        }
    });

    it('throws on unused email', async (done) => {
        try {
            await service.signin('shu@hotmail.com', '123shu123');
        } catch (error) {
            done();
        }
    });
    it('throws on invalid password', async (done) => {

        await service.signin("shu@hotmail.com", "password1")
        try {
            await service.signin('shu@hotmail.com', 'password');
        } catch (error) {
            done();
        }
    });

    it('returns user on login', async () => {

        await service.signup('24@gmail.com', '24')
        const user = await service.signin('24@gmail.com', '24');
        expect(user).toBeDefined();
    });
});
