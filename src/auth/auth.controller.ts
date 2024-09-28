import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} // 👈 Inject the AuthService

  //localhost:3000/auth/signup
  @Post('/signup')
  @UsePipes(ValidationPipe)
  //Body('password', ValidationPipe)사용하면 비밀번호만 검사 가능
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) //authguard = passport-jwt 에서 가져옴
  // 인증 미들 웨어를 사용하겠다고 선언
  // 클라에서 오는 것들을 먼저 봄
  // guard -> interceptor -> pipe 순서로 실행
  //custom decorator 사용
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}
