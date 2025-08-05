import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelMedia } from '../model/hotelMedia.model';

@Injectable({
  providedIn: 'root'
})
export class HotelMediaService {


  private baseUrl = 'http://localhost:3000/hotelMedia';


  constructor( private http: HttpClient) { }


  // 🔹 Get all media
  getAllMedia(): Observable<HotelMedia[]> {
    return this.http.get<HotelMedia[]>(this.baseUrl);
  }

  // 🔹 Get media by hotelId
  getMediaByHotelId(hotelId: string): Observable<HotelMedia[]> {
    return this.http.get<HotelMedia[]>(`${this.baseUrl}?hotelId=${hotelId}`);
  }

  // 🔹 Get by media ID
  getMediaById(id: number): Observable<HotelMedia> {
    return this.http.get<HotelMedia>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Create media entry
  addMedia(data: HotelMedia): Observable<HotelMedia> {
    return this.http.post<HotelMedia>(this.baseUrl, data);
  }

  // 🔹 Update media
  updateMedia(id: number, data: HotelMedia): Observable<HotelMedia> {
    return this.http.put<HotelMedia>(`${this.baseUrl}/${id}`, data);
  }

  // 🔹 Delete media
  deleteMedia(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
