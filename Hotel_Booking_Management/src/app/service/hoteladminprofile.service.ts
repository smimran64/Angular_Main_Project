import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoteladminprofileService {
  
 private baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHotelAdminProfile(): Observable<User | null> {

    return of(this.authService.getUserProfileFromStorage());

  }

  updateHotelAdminProfile(user: User): Observable<User> {

    localStorage.setItem('userProfile', JSON.stringify(user));
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);

  }

  getHotelAdminProfileById(id: string): Observable<any> {

    return this.http.get(this.baseUrl + '/' + id);
  }

}
