import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingModel } from '../model/Booking.model';

@Injectable({
  providedIn: 'root'
})
export class Bookingservice {

  baseUrl: string = 'http://localhost:3000/bookings';


  constructor(
    private http: HttpClient
  ) { }

  viewAllBooking(): Observable<BookingModel[]> {

    return this.http.get<BookingModel[]>(this.baseUrl);
  }

  createBooking(booking: BookingModel): Observable<BookingModel> {

    return this.http.post<BookingModel>(`${this.baseUrl}`, booking);

  }

  deleteBooking(booking: string): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${booking}`);
  }

  updateBooking(booking: BookingModel): Observable<BookingModel> {
    return this.http.put<BookingModel>(`${this.baseUrl}/${booking.id}`, booking);
  }

  getByBookingId(Id: string): Observable<BookingModel> {

    return this.http.get<BookingModel>(`${this.baseUrl}/${Id}`);

  }


  submitBooking(bookingData: any): Observable<any> {

    return this.http.post(this.baseUrl, bookingData);

  }

  getBookingByHotelId(hotelId: string): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(`${this.baseUrl}?hotel=${hotelId}`);

  }

  //for userprofile 

  getBookingsByUserId(userId: string): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(`${this.baseUrl}?userid=${userId}`);
  }
  

}
