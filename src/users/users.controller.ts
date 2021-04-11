
import { AuthenticationService } from './../authentication/authentication.service';
import { Controller, Get, Post, Body, Put, Param, Delete,Req, HttpCode, UseGuards, Request, Res, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithUser } from 'src/authentication/interfaces/request-with-user.interface';
import { Response} from 'express';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from 'src/authentication/guards/local-authentication.guard';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService, private readonly authenticationService:AuthenticationService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() request){
    const user =request.body;
    const token=await this.authenticationService.login(user.userName, user.password)
    this.logger.log(token);
  return token;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    this.logger.log('logout');
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    this.logger.log(request.user)
    const user = request.user;    
    user.password = undefined;
    return user;
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
