import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminprofileService {

  private baseUrl = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getAdminProfile(): Observable<User | null> {

    return of(this.authService.getUserProfileFromStorage());

  }

  updateAdminProfile(user: User): Observable<User> {

    localStorage.setItem('adminProfile', JSON.stringify(user));
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);

  }
}
