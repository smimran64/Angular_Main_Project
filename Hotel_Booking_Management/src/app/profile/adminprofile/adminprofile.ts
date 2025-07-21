import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Subscription } from 'rxjs';
import { AdminprofileService } from '../../service/adminprofile.service';

@Component({
  selector: 'app-adminprofile',
  standalone: false,
  templateUrl: './adminprofile.html',
  styleUrl: './adminprofile.css'
})
export class Adminprofile implements OnInit {

  user: User | null = null;
  private subscription = new Subscription();


  constructor(private adminProfileService: AdminprofileService) { }
  ngOnInit(): void {
     this.loadAdminProfile();
  }

  loadAdminProfile(): void {
    const subUser = this.adminProfileService.getAdminProfile().subscribe({
      next: (res) => {
        this.user = res;       
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
      }
    });
    this.subscription.add(subUser);
  }


}
