import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-registrationform',
  standalone: false,
  templateUrl: './registrationform.html',
  styleUrl: './registrationform.css'
})
export class Registrationform {

  regForm!: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {
    this.regForm = this.formBuilder.group({


      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      photo: ['', Validators.required]
    })
  }

  onSubmit(): void {

    if (this.regForm.valid) {

      const user: User= {
        ...this.regForm.value,
        role: 'user'
      };

      this.authService.registration(user).subscribe({

        next: (res) => {

          console.log('Registration successful', res);
          this.authService.storeToken(res.token);

          this.router.navigate(['login']);

        },

        error: (err) => {

          console.error('Registration failed', err);
        }
      });
    }
    else {

      alert('Complete Mandatory fields');
    }
  }

}
