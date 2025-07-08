import { Todo } from "../entities/todo.entity";

// Интерфейс описывает, что умеет репозиторий, но не как
// Релизация будет в infrastructure 
export interface TodoRepository {
    create(todo: Todo): Promise<void>;
    update(todo: Todo): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Todo | null>;
    findAll(): Promise<Todo[]>;
}