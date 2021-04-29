import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Rooms } from 'src/app/entity/room-entity';
import { Invite } from 'src/app/entity/invite-entity';

import { createRoomEntity } from 'src/app/utils/utils';

@Component({
  selector: 'room-create',
  templateUrl: './dialog-room.component.html',
  styleUrls: ['./dialog-room.component.css'],
})
export class DialogRoomComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  invites: Invite[] = [];
  meeting: Rooms;
  inviteForms!: FormGroup;
  meetingForms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.meetingForms = this.formBuilder.group({ ...this.data.room });

    this.inviteForms = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/.{5, 50}/gm)]],
      email: [null, [Validators.required, Validators.email]],
    });

    this.invites = this.data.room.invited;
  }

  newInvite(): void {
    if (this.inviteForms.valid) {
      this.invites.push({
        id: null,
        ...this.inviteForms.value,
      });
      this.clear(this.inviteForms);
    }
  }

  remove(invite: Invite): void {
    const index = this.invites.indexOf(invite);
    if (index >= 0) {
      this.invites.splice(index, 1);
    }
  }

  save(): void {

    console.log(this.meetingForms.controls.date.value);
    if (this.meetingForms.valid) {
      this.meeting = createRoomEntity({
        ...this.meetingForms.value,
        invited: this.invites,
      });
      this.store.dispatch(this.data.action({ room: this.meeting }));
      this.clear(this.inviteForms, this.meetingForms);
    }
  }

  private clear(...forms: FormGroup[]): void {
    forms.forEach((form) => form.reset());
  }

  getErrorMessage(controls: any, key: string): string{
    if (controls[key].hasError('required')) {
      return `The field ${key} as ben required`;
    }
    else if (controls[key].hasError('email')){
      return 'Not a valid email';
    }
    else if (controls[key].hasError('pattern')){
      return `The field ${key} must contain 5 a 50 characters`;
    }
  }
}
