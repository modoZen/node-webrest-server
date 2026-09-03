import { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todos.dto.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todos.dto.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { prisma } from "../../lib/prisma.js";

export class TodoDatasourceImpl implements TodoDatasource {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<TodoEntity> {
    throw new Error("Method not implemented.");
  }
}
