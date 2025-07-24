import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-view-all-users',
  standalone: false,
  templateUrl: './view-all-users.html',
  styleUrl: './view-all-users.css'
})
export class ViewAllUsers implements OnInit {

  userList: User[] = [];
  selectedRole: string = '';
  roles: string[] = ['user', 'admin', 'hoteladmin'];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsersByRole(this.selectedRole).subscribe((data) => {
      this.userList = data;
      this.cdr.markForCheck();

    });
  }

  onRoleChange(): void {
    this.loadUsers();
  }

}
