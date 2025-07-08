import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmTodoEntity } from "./typeorm-todo.entity";
import { Repository } from "typeorm";
import { Todo } from "src/domain/todo/entities/todo.entity";
import { TodoRepository } from "src/domain/todo/repositories/todo.repository";

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TypeOrmTodoEntity)
    private readonly ormRepo: Repository<TypeOrmTodoEntity>
  ) {}

  async create(todo: Todo): Promise<void> {
    const ormTodo = this.toOrmEntity(todo);
    await this.ormRepo.save(ormTodo);
  }

  async update(todo: Todo): Promise<void> {
    const ormTodo = this.toOrmEntity(todo);
    await this.ormRepo.save(ormTodo);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async findById(id: string): Promise<Todo | null> {
    const ormTodo = await this.ormRepo.findOneBy({ id });
    return ormTodo ? this.toDomainEntity(ormTodo) : null;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.ormRepo.find();
    return todos.map(todo => this.toDomainEntity(todo));//????
  }

  private toOrmEntity(todo: Todo): TypeOrmTodoEntity {
    const orm = new TypeOrmTodoEntity();
    orm.id = todo.id;
    orm.title = todo.title;
    orm.description = todo.description;
    orm.isDone = todo.isDone;
    orm.createdAt = todo.createdAt;
    orm.updatedAt = todo.updatedAt;
    return orm;
  }

  private toDomainEntity(orm: TypeOrmTodoEntity): Todo {
    return new Todo(
      orm.id,
      orm.title,
      orm.description,
      orm.isDone,
      orm.createdAt,
      orm.updatedAt
    );
  }
}
