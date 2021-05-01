import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Meeting } from 'src/app/entity/meeting-entity';
import { MeetingEmpty } from '../../enums/meeting-empty-enum';

import { DialogMeetingComponent } from './components/dialog-meeting/dialog-meeting.component';

import { createMeeting, editMeetingDetails } from '../state/pages.actions';
import { createMeetingEntity } from 'src/app/utils/utils';

@Component({
  selector: 'meeting-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.css'],
})
export class MeetingsPage implements OnInit {

  constructor(private dialog: MatDialog) {}

  private dialogRef: MatDialogRef<any> | undefined;

  ngOnInit(): void {
     this.mock();
  }

  createRoom(): void{
    this.openDialog(
      DialogMeetingComponent,
      {
        data:
        {
          meeting: { ...MeetingEmpty, guests: [] },
          title: 'New',
          action: createMeeting
        }
      });
  }

  editRoom(id: string): void{
    const meeting = this.data.filter(e => e.id === id)[0];
    if (meeting !== undefined){
      this.openDialog(
        DialogMeetingComponent,
        {
          data:
          {
            meeting,
            title: 'Edit',
            action: editMeetingDetails
          }
        });
    }
  }
  searchByDate(queryDate: string): void{}

/////////////////////////////////////////////////////////
// tslint:disable-next-line: member-ordering
  data: Meeting[] = [];

  private mock(): void{
    for (let i = 1; i <= 20; i++){
      const guests = [];
      const guest = this.random(5, 20);
      for (let j = 1; j <= guest; j++){
        guests.push({
            id: `${j}`,
            name: `Guest/ID(${j})`,
            email: `guest_${j}@guests.com`
          });
      }
      const meeting = {
        id: `${i}`,
        name: `Meeting/ID${i}`,
        date: `2021-${this.randomString(1, 12)}-${this.randomString(5, 25)}T03:00:00.000`,
        startHour: `${this.randomString(8, 18)}:00:00`,
        endHour: `${this.randomString(8, 18)}:00:00`,
        guests: [...guests],
        status: ['active', 'canceled'][this.random(0, 1)],
      };
      this.data.push(createMeetingEntity(meeting));
    }
  }
  private random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  private randomString(min: number, max: number): string {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min;
    return result < 10 ? `0${result}` : `${result}`;
  }
///////////////////////////////////////////////////////////
  private openDialog(component: any, data?: any): void {
    this.dialogRef = this.dialog.open(component, data);
  }
}
