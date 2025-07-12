import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs';
import { UserprofileService } from '../../service/userprofile.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class Userprofile implements OnInit {

  user: User | null = null;
  private subscription: Subscription = new Subscription();


  constructor(

    private authService: AuthService,
    private router: Router,
    private userProfileService: UserprofileService
  ) { }


  ngOnInit(): void {

    this.loadUserProfile();

  }

  loadUserProfile(): void {

    const sub = this.userProfileService.getUserProfile().subscribe({
      next: (res) => {

        console.log(res);

        if (res) {
          this.user = res
        }
      },

      error: (err) => {

        console.error('Error loading user profile:', err);

      }
    });

    this.subscription.add(sub);

  }


  ngOnDestroy(): void {

    this.subscription.unsubscribe(); // Unsubscribe when the component is destroyed 

  }

}
