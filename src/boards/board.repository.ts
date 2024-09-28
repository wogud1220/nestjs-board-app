// import { EntityRepository, Repository, DataSource } from 'typeorm';
// import { Board } from './board.entity';
// import { BoardStatus } from './board-status.enum';
// import { CreateBoardDto } from './DTO/create-board.dto';

// @EntityRepository(Board)
// export class BoardRepository extends Repository<Board> {
//   constructor(private dataSource: DataSource) {
//     super(Board, dataSource.createEntityManager());
//   }

//   async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
//     const { title, description } = createBoardDto;
//     const board = new Board();
//     board.title = title;
//     board.description = description;
//     board.status = BoardStatus.PUBLIC;
//     await board.save();
//     return board;
//   }
// }

import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable() // @EntityRepository 대신 @Injectable 사용
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description: description,
      status: BoardStatus.PUBLIC,
      user: user,
    });

    await this.save(board);
    return board;
  }
}
