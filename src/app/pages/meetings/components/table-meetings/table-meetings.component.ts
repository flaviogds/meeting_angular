import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Guest } from 'src/app/entity/guest-entity';
import { Meeting } from 'src/app/entity/meeting-entity';
import { TableModel } from './entity/table-entity';
import { columnsToDisplay } from './enum/table-enum';

@Component({
  selector: 'meeting-table',
  templateUrl: './table-meetings.component.html',
  styleUrls: ['./table-meetings.component.css'],
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
    ],
  };

  @Input()
  data$: Observable<Meeting[]>;

  @Output()
  edit = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Meeting>;

  ngOnInit(): void {
    this.data$.subscribe(
      (data) => (this.dataSource = new MatTableDataSource(data))
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 0);
  }

  editMeeting(id: string): void {
    this.edit.emit(id);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  mapProperty(property: any, ...args: string[]): any {
    let value = property;
    args.forEach((key) => (value = value[key]));
    return value
      .toString()
      .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
  }

  mapGuests(guests: Guest[]): string {
    const list = [];
    guests.forEach((guest) => {
      if (list.join().length < 100) {
        list.push(guest.name);
      }
    });
    const length = guests.length - list.length;

    return ( guests.length === 0
      ? `no guests`
      : `${list.join(', ').slice(0, 99)}` + (length !== 0 ? `... +${length}` : '')
    );
  }

  valid(key: string, ...args: string[]): boolean {
    return args.includes(key);
  }
}
