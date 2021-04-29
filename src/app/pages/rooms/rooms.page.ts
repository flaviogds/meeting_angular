import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Rooms } from 'src/app/entity/room-entity';
import { RoomEmpty } from '../../enums/room-empty-enum';

import { DialogRoomComponent } from './components/dialog-room/dialog-room.component';

import { createMeeting, editMeetingDetails } from '../state/pages.actions';

@Component({
  selector: 'room-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.css'],
})
export class RoomsPage implements OnInit {

  constructor(private dialog: MatDialog) {}

  private dialogRef: MatDialogRef<any> | undefined;

  ngOnInit(): void {}

  createRoom(): void{
    this.openDialog(
      DialogRoomComponent,
      {
        data:
        {
          room: { ...RoomEmpty, invited: [] },
          title: 'New',
          action: createMeeting
        }
      });
  }

  editRoom(room: Rooms): void{
    if (room){
      this.openDialog(
        DialogRoomComponent,
        {
          data:
          {
            room,
            title: 'Edit',
            action: editMeetingDetails
          }
        });
    }
  }

  private openDialog(component: any, data?: any): void {
    this.dialogRef = this.dialog.open(component, data);
  }
}
