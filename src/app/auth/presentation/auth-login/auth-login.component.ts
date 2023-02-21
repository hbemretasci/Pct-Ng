import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
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

  hide = true;

  userLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value.';
    }
    return this.email.hasError('email') ? 'Please provide a email.' : '';
  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

  private loginUserUseCase = inject(LoginUserUseCase);
  private router = inject(Router);
  private dialog = inject(MatDialog)

  login() {
    const email: string = this.email.value;
    const password: string = this.password.value;

    this.loading = true;
    this.loginUserUseCase.execute({ email, password }).subscribe({
      next: (v) => {
        this.loading = false;  
        if(v.role == "Admin") {
          this.navigateAdminSection();
        } else {
          this.navigateUserSection();
        }
      },
      error: (e) => {
        this.error = e;
        this.loading = false;
        this.showError('Error', this.error.message);
      } 
    });
  }

  showError(title: string, content: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: {
         title: title,
         content: content
        },
      width:'250px'
    });
  }

  navigateUserSection() {
    this.router.navigate(['/user']);
  }

  navigateAdminSection() {
    this.router.navigate(['/admin']);
  }

  closeErrorDialog() {
    this.error = null;
  }

}
