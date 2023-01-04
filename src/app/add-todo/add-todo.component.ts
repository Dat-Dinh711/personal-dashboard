import { Router } from '@angular/router';
import { Todo } from './../shared/todo.model';
import { NgForm } from '@angular/forms';
import { TodoService } from './../shared/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  showValidationErrors: boolean = false;

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return (this.showValidationErrors = true);
    }

    const todo = new Todo(form.value.text);
    this.todoService.addTodo(todo);
    this.router.navigateByUrl('/todos');

    return;
  }
}
