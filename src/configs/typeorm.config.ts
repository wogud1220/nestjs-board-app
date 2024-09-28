/* eslint-disable @typescript-eslint/no-require-imports */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Expense } from '../expenses/expense.entity';
import { Trip } from '../trips/trip.entity';
import { Board } from '../boards/board.entity';

const config = require('config');
const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RES_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [User, Expense, Trip, Board],
  synchronize: dbConfig.synchronize,
};
