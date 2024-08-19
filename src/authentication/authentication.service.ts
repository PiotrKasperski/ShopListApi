import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';

@Injectable()
export class AuthenticationService implements OnModuleInit {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }
  async onModuleInit() {
    const user = await this.userService.findByUsername('klonek');
    if (!user) await this.register({ userName: 'klonek', password: 'asdf' });
  }
  public async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 14);

    const createdUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    createdUser.password = undefined;
    return createdUser;
  }
  public async login(username: string, plainTextPassword: string) {
    const user = await this.validateUser(username, plainTextPassword);
    return user
      ? {
        access_token: this.jwtService.sign({
          userName: user.userName,
          userID: user.userId,
        }),
      }
      : null;
  }
  async validateUser(username: string, plainTextPassword: string) {
    const user = await this.userService.findByUsername(username);
    this.logger.log(JSON.stringify(user));
    if (user && (await bcrypt.compare(plainTextPassword, user.password))) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );

    return null;
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
