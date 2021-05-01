import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Meeting } from 'src/app/entity/meeting-entity';
import { Guest } from 'src/app/entity/invite-entity';

import { createMeetingEntity } from 'src/app/utils/utils';

@Component({
  selector: 'meeting-create',
  templateUrl: './dialog-meeting.component.html',
  styleUrls: ['./dialog-meeting.component.css'],
})
export class DialogMeetingComponent implements OnInit {
  selectable = true;
  removable = true;
  invites: Guest[] = [];
  meeting: Meeting;
  inviteForms!: FormGroup;
  meetingForms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.meeting = this.data.meeting;

    this.meetingForms = this.formBuilder.group({
      id: [this.data.meeting.id],
      name: [
        this.data.meeting.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      date: [this.data.meeting.date, [Validators.required]],
      startHour: [this.data.meeting.startHour, [Validators.required]],
      endHour: [this.data.meeting.endHour, [Validators.required]],
    });

    this.inviteForms = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
    });

    this.invites = this.data.meeting.guests;
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

  remove(invite: Guest): void {
    const index = this.invites.indexOf(invite);
    if (index >= 0) {
      this.invites.splice(index, 1);
    }
  }

  save(): void {
    if (this.meetingForms.valid) {
      this.meeting = createMeetingEntity({
        ...this.meetingForms.value,
        guests: this.invites,
      });

      this.store.dispatch(this.data.action({ meeting: this.meeting }));
      this.clear(this.inviteForms, this.meetingForms);
    }
  }

  excludeMeeting(id: string): void{window.alert(`funfou com o id ${id}`)}

  getErrorMessage(controls: any, key: string): string {
    if (controls[key].hasError('required')) {
      return `The field is required!`;
    } else if (
      controls[key].hasError('minlength') ||
      controls[key].hasError('maxlength')
    ) {
      return `The field "${key}" must be contain 5 to 50 characters`;
    } else if (controls[key].hasError('email')) {
      return 'Not a valid email';
    }
  }

  private clear(...forms: FormGroup[]): void {
    forms.forEach((form) => form.reset());
  }
}
