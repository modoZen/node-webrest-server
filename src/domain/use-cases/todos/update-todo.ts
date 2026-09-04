import { UpdateTodoDto } from "../../dtos/todos/update-todos.dto.js";
import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}
