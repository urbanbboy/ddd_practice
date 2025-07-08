import { TodoNotFoundError } from "src/domain/todo/exceptions/todo-not-found.error";
import { TodoRepository } from "src/domain/todo/repositories/todo.repository";

export class DeleteTodoUseCase {
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    async execute(id: string) {
        const todo = await this.todoRepository.findById(id)

        if(!todo) {
            throw new TodoNotFoundError(id)
        }

        await this.todoRepository.delete(id)
    }
}