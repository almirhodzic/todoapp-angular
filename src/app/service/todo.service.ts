import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, tap} from "rxjs";
import {Todo} from "../interface/todo";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todo/all`);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todo/${id}`);
  }

  storeTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todo/store`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/todo/${todo.id}/update`, todo);
  }

  patchTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/todo/${todo.id}/update`, todo);
  }

  toggleTodo(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/todo/${id}/toggle`, id);
  }

  uploadFiles(formData: FormData): Observable<HttpEvent<string>> {
    return this.http.post<string>(`${this.apiUrl}/todo/upload`, formData,
      { observe: 'events', reportProgress: true });
  }
}
