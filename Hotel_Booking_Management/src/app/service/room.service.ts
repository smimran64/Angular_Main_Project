import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomModel } from '../model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {



  baseUrl: string = 'http://localhost:3000/rooms';

  constructor(private http: HttpClient) { }


  getAllRoom(): Observable<any> {

    return this.http.get(this.baseUrl);
  }


  addRoom(room: RoomModel): Observable<any> {
    return this.http.post(`${this.baseUrl}`, room);
  }


  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  updateRoom(id: string, room: RoomModel): Observable<any> {
    console.log(room);
    return this.http.put(this.baseUrl + '/' + id, room);

  }

  getRoomById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);

  }
  getRoomsByHotelId(hotelId: string): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(`${this.baseUrl}?hotel=${hotelId}`);
  }

}
