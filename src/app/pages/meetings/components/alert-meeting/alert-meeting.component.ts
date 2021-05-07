import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Icons } from '../../../../shared/fontawesome';

@Component({
  selector: 'meeting-alert',
  templateUrl: './alert-meeting.component.html',
  styleUrls: ['./alert-meeting.component.css']
})
export class AlertMeetingComponent {

  icon = Icons;

  constructor(
    public snackBarRef: MatSnackBarRef<AlertMeetingComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
