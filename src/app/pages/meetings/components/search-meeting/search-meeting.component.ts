import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'meeting-search',
  templateUrl: './search-meeting.component.html',
  styleUrls: ['./search-meeting.component.css'],
})
export class SearchComponent implements OnInit {
  @Output()
  date = new EventEmitter<string>();

  searchForms!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForms = this.formBuilder.group({
      start: [null, [Validators.required]],
      end: [null],
    });
  }

  search(): void {
    if (this.searchForms.valid) {
      this.date.emit(
        `${this.searchForms.controls.start.value}|
        ${this.searchForms.controls.end.value}`
      );
      this.clear();
    }
  }

  getErrorMessage(): string {
    if (this.searchForms.controls.start.hasError('required')){
      return `Initial date is required`;
    }
    return '';
  }

  private clear(): void {
    this.searchForms.reset();
  }
}
