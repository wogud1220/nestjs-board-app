import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './DTO/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
@Injectable()
export class BoardsService {
  // private boards: Array<Board> = []; //게시글을 담을 배열, 로컬
  //async await = 비동기 처리, 다 처리가 된 다음에 데이터를 받아옴, 안 쓰면 데이터를 받아오기 전에 다음 코드가 실행됨(완료가 안된 데이터를 받아옴)

  async getAllBoards(user: User): Promise<Array<Board>> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id }); // 유저 아이디가 같은 것만 가져오기
    const boards = await query.getMany(); // 여러개의 데이터를 가져옴
    return boards;
    //return await this.boardRepository.find();
  }

  // //모든 게시글 가져오기
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository, //Repository<Board>,
  ) {}
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    //   const { title, description } = createBoardDto;

    //   // 엔티티 인스턴스 생성
    //   const board = this.boardRepository.create({
    //     title,
    //     description,
    //     status: BoardStatus.PUBLIC, // 기본 상태 설정 (필요에 따라 변경 가능)
    //   });
    //   // 엔티티 저장
    //   await this.boardRepository.save(board);
    //   return board;
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(), //unique 한 value를 줄 수 있음
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board; // 게시글의 정보를 리턴해줌
  // }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } }); // where 속성 사용
    if (!found) {
      throw new NotFoundException(`내가 검색한 Cant not found ${id}`);
    }

    return found;
  }
  // getBoardById(id: String): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   //검색 했는데 없는 게시글이면 예외처리
  //   if (!found) {
  //     throw new NotFoundException(`내가 검색한 Cant not found ${id}`);
  //   }
  //   return found;
  // }
  // deleteBoard(id: String): void {
  //   //아이디가 같지 않다면 살리고 / 같은 아이디(삭제할 게시글 번호)면 걸러내서 새 배열을 생성함
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글이 없어요 ${id}`);
    }
  }

  // updateBoardStatus(id: String, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
