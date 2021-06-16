import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { State } from '../reducers';
import { setAddError } from '../reducers/addError/add-error.actions';
import { setLoading } from '../reducers/loading/loading.actions';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(
    private dateService: DateService,
    private store: Store<State>
  ) { }

  public date: BehaviorSubject<moment.Moment> = this.dateService.date;

  public go(dir: number): void {
    this.store.dispatch(setLoading({ payload: true }));
    this.store.dispatch(setAddError({ payload: false }));
    this.dateService.changeMonth(dir);
  }

}
