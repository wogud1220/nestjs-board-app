import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BoardsModule } from './boards/boards.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //<>추가함

  //어플리케이션 생성, 루트모듈이 앱모듈임
  const config = require('config'); //commonJs 방식으로 가져오기
  const serverConfig = config.get('server'); //ES6로 가져오기

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  await app.listen(serverConfig.port); //어플리케이션을 3000번

  Logger.log(
    `Application running on http://localhost:${serverConfig.port}`,
    'Bootstrap',
  ); //어디에서 시작되었다는 로그 남김
}
bootstrap();
