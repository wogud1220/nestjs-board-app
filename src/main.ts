/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// Swagger 관련 import 추가
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //<>추가함

  //어플리케이션 생성, 루트모듈이 앱모듈임
  const config = require('config'); //commonJs 방식으로 가져오기
  const serverConfig = config.get('server'); //ES6로 가져오기

  // Swagger 설정
  const configs = new DocumentBuilder()
    .setTitle('Trip Ledger API')
    .setDescription('The Trip Ledger API Swagger Documentation')
    .setVersion('v1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configs);
  SwaggerModule.setup('swagger-ui/index.html', app, document); // swagger-ui/index.html로 접속 필요

  await app.listen(serverConfig.port); //어플리케이션을 3000번

  Logger.log(
    `Application running on http://localhost:${serverConfig.port}`,
    'Bootstrap',
  ); //어디에서 시작되었다는 로그 남김
  // CORS 설정
  app.enableCors();
}
bootstrap();
