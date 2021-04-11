import { TokenPayload } from './../../../dist/authentication/token-payload.interface.d';


import { UsersService } from './../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(private readonly configService:ConfigService, private readonly usersService:UsersService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
    async validate(payload:TokenPayload){
        return this.usersService.findOne(payload.userID);
    }
}