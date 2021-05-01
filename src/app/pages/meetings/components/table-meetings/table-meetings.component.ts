import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Guest } from 'src/app/entity/invite-entity';
import { Meeting } from 'src/app/entity/meeting-entity';
import { TableModel } from './entity/table-entity';
import { columnsToDisplay } from './enum/table-enum';

@Component({
  selector: 'meeting-table',
  templateUrl: './table-meetings.component.html',
  styleUrls: ['./table-meetings.component.css']
})
export class TableMeetingComponent implements OnInit, AfterViewInit {

  columnsToDisplay: TableModel = {
    ...columnsToDisplay,
    list: () => [
      'id',
      'name',
      'date',
      'startHour',
      'endHour',
      'guests',
      'status',
    ]
  };

  dataSource: MatTableDataSource<Meeting>;

  @Input()
  data: Meeting[];

  @Output()
  edit = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editMeeting(id: string): void {
    this.edit.emit(id);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mapProperty(property: any, ...args: string[]): any {
    let value = property;
    args.forEach(key => value = value[key]);
    return value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  }

  mapGuests(guests: Guest[]): string {
    const list = [];
    guests.forEach((guest) => {
      if (list.join().length < 100) {
        list.push(guest.name);
      }
    });

    const length = guests.length - list.length;

    return `${list.join(', ').slice(0, 99)}` + (length !== 0 ? `... +${length}` : '');
  }

  valid(key, ...args: string[]): boolean {
    return args.includes(key);
  }
}
