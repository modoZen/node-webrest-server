import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todos.dto.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todos.dto.js";
import { TodoRepository } from "../../domain/repositories/todo.repository.js";
import { GetTodos } from "../../domain/use-cases/todos/get-todos.js";
import { GetTodo } from "../../domain/use-cases/todos/get-todo.js";
import { CreateTodo } from "../../domain/use-cases/todos/create-todo.js";
import { UpdateTodo } from "../../domain/use-cases/todos/update-todo.js";
import { DeleteTodo } from "../../domain/use-cases/todos/delete-todo.js";

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error !== undefined) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error !== undefined) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
