import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelCredentials } from '../model/hotelCridentials.model';

@Injectable({
  providedIn: 'root'
})
export class HotelCridentialService {

  private baseUrl: string = 'http://localhost:3000/hotelCredentials';

  constructor(

    private http: HttpClient
  ) { }

  getAllHotelCredentials(): Observable<HotelCredentials[]> {

    return this.http.get<HotelCredentials[]>(this.baseUrl);
  }


  getHotelCredentialsById(id: string): Observable<HotelCredentials> {

    return this.http.get<HotelCredentials>(`${this.baseUrl}/${id}`);
  }

  addHotelCredentials(data: HotelCredentials): Observable<any> {

    return this.http.post<any>(this.baseUrl, data);
  }

  updateHotelCredentials(id: string, data: HotelCredentials): Observable<HotelCredentials> {

    return this.http.put<HotelCredentials>(`${this.baseUrl}/${id}`, data);
  }


  deleteHotelCredentials(id: string): Observable<any> {

    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getHotelCredentialsByHotelId(hotelId: string): Observable<HotelCredentials[]> {
    return this.http.get<HotelCredentials[]>(`${this.baseUrl}?hotelId=${hotelId}`);
  }
}
