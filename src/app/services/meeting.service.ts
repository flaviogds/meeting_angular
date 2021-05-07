import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { createMeetingEntity, createMeetingEntityList } from '../utils/utils';

import { Meeting } from '../entity/meeting-entity';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private readonly url = environment.url;

  constructor(private http: HttpClient) { }

  listAllMeeting(): Observable<Meeting[]>{
    return this.get('', '')
      .pipe(
        map(response => createMeetingEntityList(response)),
      );
  }

  ListMeetingByDate( query: any ): Observable<Meeting[]>{
    if (query){
      const params = new HttpParams({ fromObject: { ...query } });

      return this.get('', 'findByDate', params)
        .pipe(
          map(response => createMeetingEntityList(response)),
        );
    }
  }

  findMeetingById( id: string ): Observable<Meeting>{
    return this.get(id, '')
      .pipe(map(createMeetingEntity));
  }

  createMeeting( meeting: Meeting ): Observable<any>{
    return this.http.post(`${this.url}/meeting`, meeting);
  }

  updateMeeting( meeting: Meeting ): Observable<any>{
    return this.http.put(`${this.url}/meeting/${meeting.id}`, meeting);
  }

  deleteMeeting( id: string ): Observable<any>{
    return this.http.delete(`${this.url}/meeting/${id}`);
  }

  private get<T>( id?: string, endPoint?: string, params?: HttpParams ): Observable<T>{
    return this.http.get<T>(`${this.url}/meeting/${endPoint}${id}`, { params });
  }
}
