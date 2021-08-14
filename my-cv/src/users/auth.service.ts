import { UsersService } from './users.service';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }
    signup = async (email: string, password: string) => {
        // see if email is in use
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        // hash the password

        // generate salt
        const salt = randomBytes(8).toString('hex');

        // hash salt & pass
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //   join hash + salt
        const result = salt + '.' + hash.toString('hex');

        // create a new user and save it

        const user = await this.userService.create(email, result);

        // return the user
        return user;
    };
    signin = async (email: string, password: string) => {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new NotFoundException('user not found 🕗');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (storedHash !== hash.toString("hex")) {
            throw new BadRequestException("wrong password");
        }
        return user;


    };
}
