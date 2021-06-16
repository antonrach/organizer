import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public date: BehaviorSubject<moment.Moment>;

  constructor() {
    const savedDate = localStorage.getItem('dateOrganizer');

    if (savedDate !== null && moment(new Date(savedDate)).isValid()) {
      this.date = new BehaviorSubject(moment(savedDate));
    } else {
      this.date = new BehaviorSubject(moment());
    }
  }

  public changeMonth(dir: number): void {
    const value = this.date.value.add(dir, 'month');

    this.date.next(value);
  }

  public changeDate(date: moment.Moment): void {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month(),
      year: date.year()
    });

    this.date.next(value);
  }
}
