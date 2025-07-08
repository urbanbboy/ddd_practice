import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { CreateTodoUseCase } from "src/application/todo/use-cases/create-todo.use-case";
import { TypeOrmTodoRepository } from "../persistence/typeorm-todo.repository";
import { CreateTodoDto } from "src/application/todo/dto/create-todo.dto";
import { GetTodoUseCase } from "src/application/todo/use-cases/get-todo.use-case";
import { Response } from "express";
import { TodoNotFoundError } from "src/domain/todo/exceptions/todo-not-found.error";
import { GetAllTodosUseCase } from "src/application/todo/use-cases/get-all-todos.use-case";
import { UpdateTodoDto } from "src/application/todo/dto/update-todo.dto";
import { UpdateTodoUseCase } from "src/application/todo/use-cases/update-todo.use-case";
import { DeleteTodoUseCase } from "src/application/todo/use-cases/delete-todo.use-case";

@Controller("todos")
export class TodoController {
  private readonly createTodoUseCase: CreateTodoUseCase;
  private readonly getTodoUseCase: GetTodoUseCase;
  private readonly getAllTodosUseCase: GetAllTodosUseCase;
  private readonly updateTodoUseCase: UpdateTodoUseCase;
  private readonly deleteTodoUseCase: DeleteTodoUseCase;

  constructor(private readonly todoRepo: TypeOrmTodoRepository) {
    this.createTodoUseCase = new CreateTodoUseCase(todoRepo);
    this.getTodoUseCase = new GetTodoUseCase(todoRepo);
    this.getAllTodosUseCase = new GetAllTodosUseCase(todoRepo);
    this.updateTodoUseCase = new UpdateTodoUseCase(todoRepo);
    this.deleteTodoUseCase = new DeleteTodoUseCase(todoRepo);
  }

  @Post()
  async create(@Body() dto: CreateTodoDto): Promise<void> {
    await this.createTodoUseCase.execute(dto);
  }

  @Get(":id")
  async getById(@Param("id") id: string, @Res() res: Response) {
    try {
      const todo = await this.getTodoUseCase.execute(id);
      return res.status(200).json(todo);
    } catch (err) {
      if (err instanceof TodoNotFoundError) {
        return res.status(404).json({ message: err.message });
      }
    }
  }

  @Get()
  async getAllTodos(@Res() res: Response) {
    const todos = await this.getAllTodosUseCase.execute();
    return res.status(200).json(todos);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateTodoDto,
    @Res() res: Response
  ) {
    try {
      const updatedTodo = await this.updateTodoUseCase.execute(id, dto);
      return res.status(200).json(updatedTodo);
    } catch (err) {
      if (err instanceof TodoNotFoundError) {
        return res.status(404).json({ message: err.message });
      }
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.deleteTodoUseCase.execute(id);
  }
}
