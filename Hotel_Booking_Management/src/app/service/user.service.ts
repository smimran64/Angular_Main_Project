import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  // Fetch users by role
  getUsersByRole(role: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?role=${role}`);
  }

  // Fetch all users
  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
