import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  protected title = 'Hotel_Booking_Management';

  userRole: string | null = '';
  currentUser: User | null = null;

  constructor(
    private authService: AuthService

  ) { }
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userRole = user?.role || null;
    });
  }

}
