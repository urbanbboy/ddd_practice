import { Todo } from "src/domain/todo/entities/todo.entity";
import { TodoRepository } from "src/domain/todo/repositories/todo.repository";
import { UpdateTodoDto } from "../dto/update-todo.dto";
import { TodoNotFoundError } from "src/domain/todo/exceptions/todo-not-found.error";


export class UpdateTodoUseCase {
    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    async execute(id: string, dto: UpdateTodoDto): Promise<Todo> {
        const todo = await this.todoRepository.findById(id)

        if(!todo) {
            throw new TodoNotFoundError(id)
        }

        todo.update(dto.title, dto.description)
        await this.todoRepository.update(todo)

        return todo;
    }
}