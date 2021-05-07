import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'meeting-search',
  templateUrl: './search-meeting.component.html',
  styleUrls: ['./search-meeting.component.css'],
})
export class SearchComponent implements OnInit {
  @Output()
  byDate = new EventEmitter<string>();

  searchForms!: FormGroup;
  controlsError: boolean;
  query: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForms = this.formBuilder.group({
      start: [null, [Validators.required]],
      end: [null],
      list: [false]
    });
  }

  onFormSubmit(): void {
    if (this.searchForms.valid) {
      const start = this.searchForms.controls.start.value;
      const end = this.searchForms.controls.end.value;
      const list = this.searchForms.controls.list.value ? 'all' : 'active';

      this.byDate.emit(`${this.getDate(start)}|${this.getDate(end)}|${list}`);
      this.clear();
    } else {
      this.controlsError = true;
    }
  }

  getErrorMessage(): string {
    if (this.searchForms.controls.start.hasError('required')) {
      return `Initial date is required`;
    } else {
      return '';
    }
  }

  private clear(): void {
    this.searchForms.reset();
  }

  private getDate(date: string): string {
    return date ? new Date(date)
      .toJSON()
      .toString()
      .replace(/T.*Z$/gm, '') : '';
  }
}
