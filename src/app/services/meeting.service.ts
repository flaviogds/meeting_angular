import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { createMeetingEntity, createMeetingEntityList } from '../utils/utils';

import { Meeting } from '../entity/meeting-entity';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private readonly url = environment.url;

  constructor(private http: HttpClient) { }

  listPublicMeeting(): Observable<Meeting[]>{
    return this.get('')
      .pipe(
        map(response => createMeetingEntityList(response)),
      );
  }

  findPublicMeetingByDate( query: any ): Observable<Meeting[]>{
    const params = new HttpParams({ fromObject: { ...query } });

    return this.get('', params)
      .pipe(
        map(response => createMeetingEntityList(response)),
      );
  }

  findPublicMeetingById( id: string ): Observable<Meeting>{
    return this.get(id)
      .pipe(map(createMeetingEntity));
  }

  // tslint:disable-next-line: typedef
  createMeeting( meeting: Meeting ){
    return this.http.post(`${this.url}/room`, meeting).pipe(
      catchError((err, caught$) => {
        return caught$;
      }),
      map(status => {
        return status;
      })
    );
  }

  // tslint:disable-next-line: typedef
  updateMeeting( meeting: Meeting ){
    return this.http.put(`${this.url}/room/${meeting.id}`, meeting);
  }

  // tslint:disable-next-line: typedef
  deleteMeeting( id: string ){
    return this.http.delete(`${this.url}/room/${id}`);
  }

  private get<T>( id?: string, params?: HttpParams ): Observable<T>{
    return this.http.get<T>(`${this.url}/room/${id}`, { params });
  }
}
