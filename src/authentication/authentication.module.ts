import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:[
    forwardRef(()=>UsersModule),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>({
        secret: configService.get('JWT_SECRET'),
        signOptions:{
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`
        }
      })
    })
  ],
  providers: [AuthenticationService,LocalStrategy,JwtStrategy],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}
