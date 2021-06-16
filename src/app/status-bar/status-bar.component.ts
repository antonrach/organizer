import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import { selectIsToday } from '../reducers/is-today/is-today.selectors';
import { selectRemovalProcessing } from '../reducers/loading/loading.selectors';
import { fadeAnimation } from '../shared/animations';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class StatusBarComponent implements OnInit {

  constructor(
    private store: Store<State>
  ) { }

  public isToday$: Observable<boolean> = this.store.pipe(
    select(selectIsToday)
  );

  public removalProcessing$ = this.store.pipe(
    select(selectRemovalProcessing)
  );

  ngOnInit(): void {
  }

}
