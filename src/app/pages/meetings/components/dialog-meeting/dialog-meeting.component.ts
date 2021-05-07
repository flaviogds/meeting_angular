import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Meeting } from 'src/app/entity/meeting-entity';
import { Guest } from 'src/app/entity/guest-entity';

import { createMeetingEntity } from 'src/app/utils/utils';

@Component({
  selector: 'meeting-create',
  templateUrl: './dialog-meeting.component.html',
  styleUrls: ['./dialog-meeting.component.css'],
})
export class DialogMeetingComponent implements OnInit {
  selectable = true;
  removable = true;
  meeting: Meeting;
  invites: Guest[] = [];
  inviteForms!: FormGroup;
  meetingForms!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.meeting = { ...this.data.meeting };

    this.meetingForms = this.formBuilder.group({
      name: [
        this.data.meeting.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      date: [this.formatDate(this.data.meeting.date), [Validators.required]],
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

    this.invites = [...this.data.meeting.guests];
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

  removeInvite(invite: Guest): void {
    const index = this.invites.indexOf(invite);
    if (index >= 0) {
      this.invites.splice(index, 1);
    }
  }

  saveMeeting(): any {
    if (this.meetingForms.valid) {
      this.meeting = createMeetingEntity({
          ...this.meeting,
          ...this.meetingForms.value,
          date: this.formatDate(this.meetingForms.value.date),
          guests: this.invites
        });
      if (!this.unchanged(this.data.meeting, this.meeting)){
        return {
          action: this.data.action,
          data: {...this.meeting}
        };
      }
      else {
        return null;
      }
    }
  }

  excludeMeeting(id: string): any {
    return { action: 'delete', data: { id } };
  }

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

  private formatDate(date: string): any {
    const newDate = new Date(date)
        .toJSON()
        .toString()
        .replace(/T.*Z$/gm, '');

    return date ? newDate : '';
  }
  private unchanged(origin: Meeting, changes: Meeting): boolean{
    return JSON.stringify(origin) === JSON.stringify(changes);
  }
}
