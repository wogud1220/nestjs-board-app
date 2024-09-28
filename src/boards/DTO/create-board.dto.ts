//클래스는 런타임에서 작동 --> 파이프에서 유용

import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: String;
  @IsNotEmpty()
  description: String;
  status: any;
}
