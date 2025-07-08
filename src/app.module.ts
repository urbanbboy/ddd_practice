
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './infrastructure/todo/modules/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres_todo_ddd',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    TodoModule,
  ],
})
export class AppModule {}