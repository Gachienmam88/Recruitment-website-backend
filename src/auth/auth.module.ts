import { RolesModule } from './../roles/roles.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import ms from 'ms';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService,LocalStrategy,JwtStrategy],
  imports:[UsersModule,PassportModule,RolesModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async (configService:ConfigService)=>({
      secretOrPrivateKey:configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      signOptions:{
        expiresIn:configService.get<string>('JWT_ACCESS_EXPIRED')
      }
    }),
    inject:[ConfigService]
  })],
  exports:[AuthService],
  controllers:[AuthController]
})
export class AuthModule {}
