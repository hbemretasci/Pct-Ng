import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserUseCase } from '../../domain/use-case/login-user.usecase';

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

  private _loginUserUseCase = inject(LoginUserUseCase);
  private _router = inject(Router);

  login() {
    const email: string = this.email.value;
    const password: string = this.password.value;

    this.loading = true;
    this._loginUserUseCase.execute({ email, password }).subscribe({
      next: (v) => {
        this.loading = false;  
        this._router.navigate(['/admin/']);
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
