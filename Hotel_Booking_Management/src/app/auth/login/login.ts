import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(

    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {  }
    


  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {  

      this.errorMessage = 'Please fill in all required fields correctly';

      return;

      }    

    const userDetails = this.loginForm.value;
    this.authService.login(userDetails).subscribe({

      next: (res) => {

        console.log('Login successful', res);

        this.authService.storeToken(res.token);

        const role = this.authService.getCurrentUserRole();
        
        console.log('User role:',role);  

        if (role === 'user') {

          this.router.navigate(['/home']);
        }
        else if (role === 'admin') {
          this.router.navigate(['/adminprofile']);
        }
        else if (role === 'hoteladmin') {
          this.router.navigate(['/hoteladminprofile']);
        }

        else {
          this.errorMessage = 'Invalid user role';
        }

        this.loginForm.reset();
      },

      error: (err) => {
        console.log('Login failed', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    })

  
  }

}
