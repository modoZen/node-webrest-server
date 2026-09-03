import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todos.dto.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todos.dto.js";

export class TodoController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({ where: { id } });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error !== undefined) {
      return res.status(400).json({ error });
    }

    const todo = await prisma.todo.create({ data: createTodoDto });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error !== undefined) {
      return res.status(400).json({ error });
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `TODO with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto.values,
    });

    return res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return res.status(404).json({ error: `TODO with id ${id} not found` });
    }

    const deleted = await prisma.todo.delete({ where: { id } });

    deleted
      ? res.json(deleted)
      : res.status(400).json({ error: `Todo with id ${id} not found` });
  };
}
