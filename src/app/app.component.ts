import {Component, OnInit} from '@angular/core';
import {LoggingService} from "./logging.service";
import {SoundEffects} from "./enum/sound-effects";
import {TodoService} from "./service/todo.service";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";
import {Todo} from "./interface/todo";
import {identifierName} from "@angular/compiler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  todos: Todo[] | undefined;
  newTodo = '';
  appTitle = "Meine Todos";
  title: any;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.onGetTodos();
  }

  setTodo(event: KeyboardEvent) {
    this.newTodo = (event.target as HTMLInputElement).value;
  }

  onGetTodos(): void {
    this.todoService.getTodos().subscribe(
      (response) => {
        this.todos = response;
      },
      (error: any) => console.log(error),
      () => ''
    );
  }

  onStoreTodo(): void {
    this.todoService.storeTodo({ title: this.newTodo, done: false }).subscribe(
      (response) => {this.onGetTodos(), this.handleClear(), this.soundSuccess()},
      (error: any) => console.log(error),
      () => ''
    );
  }

  onUpdateTodo(): void {
    // @ts-ignore
    this.todoService.updateTodo(this.todo).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => ''
    );
  }

  onToggleTodo(id: number): void {
    this.todoService.toggleTodo(id).subscribe(
      (response) => {this.onGetTodos(), this.handleClear(), this.soundToggle()},
      (error: any) => console.log(error),
      () => ''
    );
  }

  onDeleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      (response) => {this.onGetTodos(), this.soundDelete()},
      (error: any) => console.log(error),
      () => ''
    );
  }

  soundToggle() {
    let audio: HTMLAudioElement = new Audio('../assets/sounds/toggle.wav');
    audio.play().then();
  }
  soundDelete() {
    let audio: HTMLAudioElement = new Audio('../assets/sounds/recycle.wav');
    audio.play().then();
  }
  soundSuccess() {
    let audio: HTMLAudioElement = new Audio('../assets/sounds/success.wav');
    audio.play().then();
  }
  handleClear() {
    this.title = '';
  }
  countOpenTodos() {
    // @ts-ignore
    if (this.todos !== undefined) {
    return this.todos.filter(todo => !todo.done).length
    } else {
      return;
    }
  }
  countClosedTodos() {
    // @ts-ignore
    if (this.todos !== undefined) {
      return this.todos.filter(todo => todo.done).length
    } else {
      return;
    }
  }

  protected readonly identifierName = identifierName;
}
