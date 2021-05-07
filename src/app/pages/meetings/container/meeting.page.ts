import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Meeting } from 'src/app/entity/meeting-entity';
import { MeetingEmpty } from '../../../enums/meeting-empty-enum';

import { DialogMeetingComponent } from '../components/dialog-meeting/dialog-meeting.component';
import { AlertMeetingComponent } from '../components/alert-meeting/alert-meeting.component';

import * as actions from '../../state/pages.actions';
import * as selectors from '../../state/pages.selectors';

@Component({
  selector: 'meeting-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.css'],
})
export class MeetingsPage implements OnInit {
  private dialogRef: MatDialogRef<any> | undefined;

  data$: Observable<Meeting[]>;
  status$: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private alertBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.pipe(select(selectors.selectResponse));
    this.status$ = this.store.pipe(select(selectors.selectStatus));

    this.status$.subscribe(
      (status) => status && this.openSnackBar(status)
    );

    this.initApp();
  }

  openCreateMeeting(): void {
    this.openDialog(DialogMeetingComponent, {
      data: {
        meeting: { ...MeetingEmpty, status: 'active', guests: [] },
        title: 'New',
        action: 'create',
      },
    });
  }

  openEditMeeting(id: string): void {
    const meeting = [];

    this.data$.subscribe((data) =>
      meeting.push(data.filter((e) => e.id === id)[0])
    );

    if (meeting !== undefined) {
      this.openDialog(DialogMeetingComponent, {
        data: {
          meeting: meeting[0],
          title: 'Edit',
          action: 'edit',
        },
      });
    }
  }

  searchMeetingByDate(queryDate: string): void {
    const [start, end, list] = queryDate.split('|');
    this.dispatch({
      action: 'listByDate',
      data: { start, end, list },
    });
  }

  private initApp(): void {
    this.dispatch({ action: '', data: {} });
  }

  private openSnackBar(status: any): void {
    if (status.message !== null) {
      this.alertBar.openFromComponent(AlertMeetingComponent, {
        data: status,
        panelClass: 'alert-container',
        verticalPosition: 'top',
        duration: 2000,
      });
    }
  }

  private openDialog(component: any, data?: any): void {
    this.dialogRef = this.dialog.open(component, data);
    this.dialogRef.afterClosed().subscribe((result) => this.dispatch(result));
  }

  private dispatch(result: any): void {
    if (result) {
      switch (result.action) {
        case 'create':
          this.store.dispatch(actions.createMeeting({ meeting: result.data }));
          break;
        case 'edit':
          this.store.dispatch(
            actions.editMeetingDetails({ meeting: result.data })
          );
          break;
        case 'delete':
          this.store.dispatch(actions.deleteMeeting({ ...result.data }));
          break;
        case 'listByDate':
          this.store.dispatch(
            actions.listByDate({ query: { ...result.data } })
          );
          break;
        default:
          this.store.dispatch(actions.listAllMeetings());
          break;
      }
    }
  }
}
