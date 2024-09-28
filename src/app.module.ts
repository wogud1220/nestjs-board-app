import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expense.module';
import { TripsModule } from './trips/trip.module';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    ExpensesModule,
    TripsModule,
  ],
})
export class AppModule {}
