import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
