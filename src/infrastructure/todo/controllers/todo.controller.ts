import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { CreateTodoUseCase } from "src/application/todo/use-cases/create-todo.use-case";
import { TypeOrmTodoRepository } from "../persistence/typeorm-todo.repository";
import { CreateTodoDto } from "src/application/todo/dto/create-todo.dto";
import { GetTodoUseCase } from "src/application/todo/use-cases/get-todo.use-case";
import { Response } from "express";
import { TodoNotFoundError } from "src/domain/todo/exceptions/todo-not-found.error";
import { GetAllTodosUseCase } from "src/application/todo/use-cases/get-all-todos.use-case";


@Controller('todos')
export class TodoController {
    private readonly createTodoUseCase: CreateTodoUseCase;
    private readonly getTodoUseCase: GetTodoUseCase;
    private readonly getAllTodosUseCase: GetAllTodosUseCase;

    constructor(
        private readonly todoRepo: TypeOrmTodoRepository,
    ) {
        this.createTodoUseCase = new CreateTodoUseCase(todoRepo);
        this.getTodoUseCase = new GetTodoUseCase(todoRepo);
        this.getAllTodosUseCase = new GetAllTodosUseCase(todoRepo);
    }

    @Post()
    async create(@Body() dto: CreateTodoDto): Promise<void> {
        await this.createTodoUseCase.execute(dto)
    }

    @Get(':id')
    async getById(@Param('id') id: string, @Res() res: Response) {
        try {
            const todo = await this.getTodoUseCase.execute(id)
            return res.status(200).json(todo)
        } catch (err) {
            if(err instanceof TodoNotFoundError) {
                return res.status(404).json({ message: err.message })
            }
        }
    }

    @Get()
    async getAllTodos(@Res() res: Response) {
        const todos = await this.getAllTodosUseCase.execute()
        return res.status(200).json(todos)
    }
}