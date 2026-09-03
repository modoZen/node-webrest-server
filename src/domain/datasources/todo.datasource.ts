import { CreateTodoDto } from "../dtos/todos/create-todos.dto.js";
import { UpdateTodoDto } from "../dtos/todos/update-todos.dto.js";
import { TodoEntity } from "../entities/todo.entity.js";

// src/domain/datasources/todo.datasource.ts
export abstract class TodoDatasource {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

  // TODO: recibirá paginación
  abstract getAll(): Promise<TodoEntity[]>;

  abstract findById(id: number): Promise<TodoEntity>;

  abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

  abstract deleteById(id: number): Promise<TodoEntity>;
}
