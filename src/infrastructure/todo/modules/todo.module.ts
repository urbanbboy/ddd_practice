// infrastructure/todo/modules/todo.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTodoEntity } from '../persistence/typeorm-todo.entity';
import { TypeOrmTodoRepository } from '../persistence/typeorm-todo.repository';
import { TodoController } from '../controllers/todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmTodoEntity])],
  providers: [TypeOrmTodoRepository],
  controllers: [TodoController],
})
export class TodoModule {}