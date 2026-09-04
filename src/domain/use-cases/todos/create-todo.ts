import { CreateTodoDto } from "../../dtos/todos/create-todos.dto.js";
import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
