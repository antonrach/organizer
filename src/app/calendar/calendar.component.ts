import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { State } from '../reducers';
import { setAddError } from '../reducers/addError/add-error.actions';
import { setIsToday } from '../reducers/is-today/is-today.actions';
import { setLoading } from '../reducers/loading/loading.actions';
import { DateService } from '../shared/date.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disablid: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

interface ToggleToday {
  payload: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  public calendar: Week[];

  public dateSub$: Subscription;

  constructor(
    private dateService: DateService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.dateSub$ = this.dateService.date.subscribe(this.generate.bind(this));
  }

  ngOnDestroy(): void {
    this.dateSub$.unsubscribe();
  }

  generate(now: moment.Moment): void {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');

            return {
              value, active, disabled, selected
            };
          })
      });
    }

    this.calendar = calendar;

    localStorage.setItem('dateOrganizer', now.format('YYYY/MM/DD'));
  }

  select(day: moment.Moment): void {
    this.store.dispatch(setLoading({ payload: true }));
    this.store.dispatch(setAddError({ payload: false }));
    this.dateService.changeDate(day);
  }

  toggleTodayMessage({ payload, isActive }: ToggleToday): void {
    if (isActive) {
      this.store.dispatch(setIsToday({ payload }));
    }
  }
}
