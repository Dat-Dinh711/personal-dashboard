import { Todo } from './todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor() {}

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(id: string, updatedTodoField: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo!, updatedTodoField);
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
}
