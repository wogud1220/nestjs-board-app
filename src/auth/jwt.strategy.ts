import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as config from 'config';

const config = require('config');
const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    //payload안에 유저 이름이 있어서 유저 객체를 데이터베이스에서 가져올 거라서 userRepository를 주입
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret, //authmodule에서는 토큰을 설정할때 사용
      //   여기에 넣는 것은 토큰이 유효한지 검증할때 사용하는 것
      // 똑같은 걸 넣어도 용도가 다름
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰이 헤더에서 가고 Bearertoken Type으로 가져오겠다.
    });
  }

  async validate(payload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
