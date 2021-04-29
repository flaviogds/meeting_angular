import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { createRoomEntity, createRoomEntityList } from '../utils/utils';

import { Rooms } from '../entity/room-entity';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private readonly url = environment.url;

  constructor(private http: HttpClient) { }

  listPublicRooms(): Observable<Rooms[]>{
    return this.get('room', '')
      .pipe(
        map(response => createRoomEntityList(response)),
      );
  }

  findPublicRoomByDate( query: any ): Observable<Rooms[]>{
    const params = new HttpParams({ fromObject: { ...query } });

    return this.get('room', '', params)
      .pipe(
        map(response => createRoomEntityList(response)),
      );
  }

  findPublicRoomById( id: string ): Observable<Rooms>{
    return this.get('room', id)
      .pipe(map(createRoomEntity));
  }

  // tslint:disable-next-line: typedef
  createRoom(endpoint: string, room: Rooms){
    return this.http.post(`${this.url}/${endpoint}`, room).pipe(
      catchError((err, caught$) => {
        return caught$;
      }),
      map(status => {
        return status;
      })
    );
  }

  // tslint:disable-next-line: typedef
  updateRoom(endpoint: string, room: Rooms){
    return this.http.put(`${this.url}/${endpoint}/${room.id}`, room);
  }

  // tslint:disable-next-line: typedef
  deleteRoom(endpoint: string, id: string){
    return this.http.delete(`${this.url}/${endpoint}/${id}`);
  }

  private get<T>(endpoint: string, id?: string, params?: HttpParams): Observable<T>{
    return this.http.get<T>(`${this.url}/${endpoint}/${id}`, { params });
  }
}
