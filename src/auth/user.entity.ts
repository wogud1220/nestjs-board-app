import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
// @Unique(['username', 'password'])
// •	username: user1, password: pass123인 레코드가 이미 존재한다면, 동일한 username과 password 조합은 허용되지 않습니다.
// •	하지만 username: user1, password: pass456과 같이 username은 같지만 password가 다른 경우에는 저장이 가능합니다.

//Controller 레벨로 가서 500에러 발생함
//UserRepository로 가서 Try Cath로 감싸서 에러처리를 해줘야함

//1. findOne으로 같은 유저 있는지 확인하고 없다면 저장 --> 데이터베이스 처리를 두번 해야됨.
//2. DB레벨에서  같은 이름을 가진 유저가 없다면 저장
// 2가 훨씬 좋음, 차이점
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
