import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    example: 'user123',
    description: '유저 아이디',
  })
  username: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    example: 'pass123',
    description: '유저 비밀번호',
  })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영어와 숫자만 가능합니다.',
  }) //영어랑 숫자만 가능한 유효성 체크
  password: string;
}
