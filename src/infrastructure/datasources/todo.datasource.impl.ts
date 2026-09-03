import { CreateTodoDto } from "../../domain/dtos/todos/create-todos.dto.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todos.dto.js";
import { TodoDatasource } from "../../domain/datasources/todo.datasource.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { prisma } from "../../lib/prisma.js";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto,
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo) throw new Error(`Todo with id ${id} not found`);

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deleted = await prisma.todo.delete({
      where: { id },
    });

    return TodoEntity.fromObject(deleted);
  }
}
