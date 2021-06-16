import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface Task {
  title: string;
  id?: string;
  date: string;
}

export interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  static url = `${environment.url}/tasks`;

  constructor(private http: HttpClient) { }

  load(date: moment.Moment): Observable<Task[]> {
    return this.http.get<Task[]>(`${TasksService.url}/${date.format('YYYY/MM/DD')}.json`)
      .pipe(
        map((tasks) => !tasks ? [] : Object.keys(tasks).map(key => ({...tasks[key], id: key})))
      );
  }

  create(task: Task): Observable<Task> {
    return this.http.post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
    .pipe(
      map(res => {
        return {...task, id: res.name};
      })
    );
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`);
  }
}
