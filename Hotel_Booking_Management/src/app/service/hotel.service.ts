import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Hotel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  baseUrl: string = 'http://localhost:3000/hotel';

  constructor(private http: HttpClient) { }


  getAllHotel(): Observable<any> {

    return this.http.get(this.baseUrl);
  }


  saveHotel(hotel: Hotel): Observable<any> {
    return this.http.post(`${this.baseUrl}`, hotel);
  }


  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  updateHotel(id: string, hotel: Hotel): Observable<any> {
    console.log(hotel);
    return this.http.put(this.baseUrl + '/' + id, hotel);

  }

  getHotelById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);

  }

  getAllHotelforRoom(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('test'));
  }
}
