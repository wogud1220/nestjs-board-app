import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './DTO/create-board.dto';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController'); //어디에서 로그를 내보내고 있는지
  constructor(private boardsService: BoardsService) {}
  @Get()
  getAllBoards(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User "${user.username}" retrieving all boards.`);
    return this.boardsService.getAllBoards(user);
  }

  // @Get()
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User, // 게시글 생성 시에 유저 정보도 넘겨줌
  ): Promise<Board> {
    this.logger.verbose(
      `User "${user.username}" creating a new board. Data: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // //body는 HTTP 요청의 본문에 포함된 데이터
  // @Post()
  // @UsePipes(ValidationPipe) //Dto에서 isnotempty로 비어있는지를 핸들러 레벨에서 확인 하겠다. nest에 6가지 기본 Pipe가 있음.
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  @Get('/:id')
  getBoardByID(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // //param은 url 경로에 포함된 값 가져올 때
  // //localhost:3000/board?id=1233
  // @Get('/:id')
  // getBoardByID(@Param('id') id: String): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: String) {
  //   return this.boardsService.deleteBoard(id);
  // }

  @Delete('/:id') //id를 기준으로 삭제
  //파이프 사용, 아이디가 숫자로 안 오면 에러
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: String,
  //   @Body('status') status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

  //postman에 patch localhost:3000/boards/1/status
  //body에 "status": "PRIVATE"를 넣어서 실행
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
