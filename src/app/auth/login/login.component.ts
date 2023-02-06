import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title: String = "Login";
  loading: boolean = false;
  error: any;

  userLoginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.loading = true;
    this.authService.loginUser(this.email.value, this.password.value).subscribe({
      next: (v) => {
        this.loading = false;  
        this.router.navigate(['/admin/']);
      },
      error: (e) => {
        this.error = e;
        this.loading = false;
      } 
    });
  }

  closeErrorDialog() {
    this.error = null;
  }

}
