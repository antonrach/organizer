import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenu } from '@angular/material/menu';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { State } from '../reducers';
import { setAddError } from '../reducers/addError/add-error.actions';
import { selectAddError } from '../reducers/addError/add-error.selectors';
import { setLoading, setRemovalProcessing } from '../reducers/loading/loading.actions';
import { selectLoading, selectRemovalProcessing } from '../reducers/loading/loading.selectors';
import { DateService } from '../shared/date.service';
import { Task, TasksService } from '../shared/tasks.service';

const notificationRemovalHeader = 'Removal';
const successRemovingMessage = 'The task was successfully removed.';
const errorRemovingMessage = `Couldn't remove the task. Please, try again.`;

const notificationParameters = (timeOut) => ({
  timeOut,
  animate: 'fade',
  showProgressBar: true,
  theClass: 'removal-notification'
});

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizerComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public tasks: Task[] = [];
  public tasksSub$: Subscription;
  public taskCreateSub$: Subscription;
  public taskRemoveSub$: Subscription;
  public errorLoadingSub$: Subscription;

  public date$: Observable<moment.Moment> = this.dateService.date;

  // public loading$: Observable<boolean>;
  public addLoading: boolean;
  public errorLoading: boolean;
  public removalProcessing: boolean[] = [];
  // public errorAdding: boolean;
  public failedTaskToAdd: Task;

  constructor(
    private dateService: DateService,
    private taskService: TasksService,
    private store: Store<State>,
    private notificationsService: NotificationsService
  ) {
    this.store.dispatch(setLoading({ payload: true }));
  }

  public loading$: Observable<boolean> = this.store.pipe(
    select(selectLoading)
  );
  public addError$: Observable<boolean> = this.store.pipe(
    select(selectAddError)
  );

  public removalProcessingSub$ = this.store.pipe(
    select(selectRemovalProcessing)
  ).subscribe((value: boolean[]) => {
    this.removalProcessing = value;
  });

  ngOnInit(): void {
    this.addLoading = false;
    this.errorLoading = false;
    this.tasksSub$ = this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))
    ).subscribe((tasks) =>  {
      if (this.errorLoadingSub$) {
        this.errorLoadingSub$.unsubscribe();
      }
      this.tasks = tasks;
      this.store.dispatch(setLoading({ payload: false }));
    }, () => {
      this.errorLoading = true;
      this.store.dispatch(setLoading({ payload: false }));
      this.errorLoadingSub$ = this.dateService.date.subscribe(value => {
        this.reload(value);
      });
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.tasksSub$.unsubscribe();
    this.taskRemoveSub$.unsubscribe();
    this.removalProcessingSub$.unsubscribe();
  }

  submit(): void {
    if (this.taskCreateSub$) {
      this.taskCreateSub$.unsubscribe();
    }
    this.addLoading = true;
    this.store.dispatch(setAddError({ payload: false }));
    const {title} = this.form.value;

    const task = {
      title,
      date: this.dateService.date.value.format('YYYY/MM/DD')
    };

    this.taskCreateSub$ = this.taskService.create(task).subscribe({
      next: ({ id }) => {
        this.tasks.push({ ...task, id });
        this.form.reset();
        this.addLoading = false;
      },
      error: error => {
        this.store.dispatch(setAddError({ payload: true }));
        this.failedTaskToAdd = task;
        this.addLoading = false;
      }
    });
  }

  dispatchRemovalProcessing(val: boolean): void {
    const processingArray = [...this.removalProcessing ];
    if (val) {
      processingArray.push(true);
      this.store.dispatch(setRemovalProcessing({ payload: processingArray }));
      return;
    }
    if (processingArray.length) {
      processingArray.pop();
      this.store.dispatch(setRemovalProcessing({ payload: processingArray }));
    }
  }

  remove(task: Task, modal: MatMenu): void {
    if (modal) {
      this.closeModal(modal);
    }
    this.dispatchRemovalProcessing(true);
    this.taskRemoveSub$ = this.taskService.remove(task).subscribe({
      next: () => {
        this.dispatchRemovalProcessing(false);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.notificationsService.success(
          notificationRemovalHeader,
          successRemovingMessage,
          notificationParameters(4000)
        );
      },
      error: e => {
        this.dispatchRemovalProcessing(false);
        this.notificationsService.error(
          notificationRemovalHeader,
          errorRemovingMessage,
          notificationParameters(6000)
        );
      }
    });
  }

  reload(day: moment.Moment): void {
    this.errorLoading = false;
    this.store.dispatch(setLoading({ payload: true }));
    this.tasksSub$ = this.taskService.load(day).subscribe({
      next: (tasks) => {
        if (this.errorLoadingSub$) {
          this.errorLoadingSub$.unsubscribe();
        }
        this.tasks = tasks;
        this.store.dispatch(setLoading({ payload: false }));
      },
      error: () => {
        this.errorLoading = true;
        this.store.dispatch(setLoading({ payload: false }));
      }
    });
  }

  retryAdd(): void {
    this.store.dispatch(setAddError({ payload: false }));
    this.addLoading = true;
    const task = this.failedTaskToAdd;

    this.addLoading = true;
    this.taskCreateSub$ = this.taskService.create(task).subscribe({
      next: () => {
        this.tasks.push(task);
        this.form.reset();
        this.addLoading = false;
      },
      error: error => {
        this.store.dispatch(setAddError({ payload: true }));
        this.failedTaskToAdd = task;
        this.addLoading = false;
      }
    });
  }

  closeModal(modal: MatMenu): void {
    modal.closed.emit();
  }
}
