import { Todo } from "src/domain/todo/entities/todo.entity";
import { TodoNotFoundError } from "src/domain/todo/exceptions/todo-not-found.error";
import { TodoRepository } from "src/domain/todo/repositories/todo.repository";


export class GetTodoUseCase {
    constructor(private readonly todoRepository: TodoRepository) {}

    async execute(id: string): Promise<Todo> {
        const todo = await this.todoRepository.findById(id)
        if(!todo) {
            throw new TodoNotFoundError(id)
        }

        return todo
    }
}