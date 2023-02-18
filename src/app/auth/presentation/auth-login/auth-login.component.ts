import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserUseCase } from '../../domain/use-case/login-user.usecase';

@Component({
  selector: 'auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  providers: [LoginUserUseCase]
})
export class AuthLoginComponent {
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

  private loginUserUseCase = inject(LoginUserUseCase);
  private router = inject(Router);

  login() {
    const email: string = this.email.value;
    const password: string = this.password.value;

    this.loading = true;
    this.loginUserUseCase.execute({ email, password }).subscribe({
      next: (v) => {
        this.loading = false;  
        if(v.role == "Admin") {
          this.router.navigate(['/admin/users']);
        } else {
          this.router.navigate(['/user']);
        }
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
