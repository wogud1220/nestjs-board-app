import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Entity('board') // 이게 엔티티라는 것을 알려주는 데코레이터, 게시물이라는 테이블을 만들어줌
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // 얘가 기본키이다.
  id: number;

  @Column() // 이게 컬럼이다.
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
  @ManyToOne(() => User, (user) => user.boards, { eager: false }) // 많은 게시물이 하나의 유저에 속한다.
  user: User;
}
