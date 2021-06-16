import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { State } from './reducers';
import { selectIsToday } from './reducers/is-today/is-today.selectors';
import { selectRemovalProcessing } from './reducers/loading/loading.selectors';
import { fadeAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimation
  ]
})
export class AppComponent {
  title = 'organizer';

  constructor(
    private store: Store<State>
  ) {}

  public isToday$: Observable<boolean> = this.store.pipe(
    select(selectIsToday)
  );

  public removalProcessing$: Observable<boolean[]> = this.store.pipe(
    select(selectRemovalProcessing)
  );

  public notificationsOptions = {
    position: ['top', 'right']
  };
}
