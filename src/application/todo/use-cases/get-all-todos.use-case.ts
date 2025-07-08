import { Todo } from "src/domain/todo/entities/todo.entity";
import { TodoRepository } from "src/domain/todo/repositories/todo.repository";

export class GetAllTodosUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(): Promise<Todo[]> {
        return this.todoRepository.findAll()
    }
}