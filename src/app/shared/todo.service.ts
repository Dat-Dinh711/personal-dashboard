import { Todo } from './todo.model';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((event: StorageEvent) => {
      if (event.key === 'todos') {
        this.loadState();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) {
      this.storageListenSub.unsubscribe();
    }
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);

    this.saveState();
  }

  updateTodo(id: string, updatedTodoField: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo!, updatedTodoField);

    this.saveState();
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);

      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos')!);

      this.todos.length = 0; // clear the todos array (while keeping the reference)
      this.todos.push(...todosInStorage);
    } catch (error) {
      console.log('There was an error retrieving the todos from localStorage');
      console.log(error);
    }
  }
}
