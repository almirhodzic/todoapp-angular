import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  @Input() todo: any;
  @Output() todoIndex = new EventEmitter<number>();
  @Output() deleteIndex = new EventEmitter<number>();

  toggleTodo() {
    this.todoIndex.emit(this.todo.id);
  }

  deleteTodo() {
    this.deleteIndex.emit(this.todo.id);
  }

  constructor() {}
  ngOnInit(): void {}
}
