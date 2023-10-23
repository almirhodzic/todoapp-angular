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
      (response) => {this.onGetTodos(), this.handleClear()},
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
      (response) => {this.onGetTodos(), this.handleClear()},
      (error: any) => console.log(error),
      () => ''
    );
  }

  onDeleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      (response) => {this.onGetTodos(), this.handleClear()},
      (error: any) => console.log(error),
      () => ''
    );
  }

  soundSuccess() {
    let audio: HTMLAudioElement = new Audio('../assets/sounds/delete2.wav');
    audio.play().then();
  }
  soundDelete() {
    let audio: HTMLAudioElement = new Audio('../assets/sounds/done.wav');
    audio.play().then();
  }
  soundToggle() {
    let audio: HTMLAudioElement = new Audio('../assets/sounds/toast_sound.mp3');
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
