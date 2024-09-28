import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './DTO/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성 해줘야됨(Secret + Payload)
      const palyload = { username }; //이름, 메일, 역할 등 넣기, 중요한 건 넣으면 안됨
      const accessToken = await this.jwtService.sign(palyload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(); //salt 생성
    const hashedPassword = await bcrypt.hash(password, salt); //비밀번호 + salt 해싱
    const user = this.create({
      username: username,
      password: hashedPassword,
    });

    //아이디가 중복되면 에러를 띄워줌
    try {
      await this.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 유저 이름입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
