import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Board])], // 👈 보드 엔티티넣고 보드를 상속받아서 쓰는 레포지토리 사용 가능
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository], // 👈 Add the BoardRepository to the providers array
})
export class BoardsModule {}
