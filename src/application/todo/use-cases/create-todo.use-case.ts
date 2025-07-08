import { TodoRepository } from "src/domain/todo/repositories/todo.repository";
import { CreateTodoDto } from "../dto/create-todo.dto";
import { Todo } from "src/domain/todo/entities/todo.entity";
import { v4 as uuidv4 } from 'uuid'

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(dto: CreateTodoDto): Promise<void> {
    const todo = new Todo(
      uuidv4(),
      dto.title,
      dto.description,
      false,
      new Date()
    )

    await this.todoRepository.create(todo)
  }
}