import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetLoggedUserUseCase } from 'src/app/auth/domain/use-case/get-logged-user.usecase';
import { LogoutUserUseCase } from '../../../auth/domain/use-case/logout-user.usecase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    GetLoggedUserUseCase,
    LogoutUserUseCase
  ]
})
export class NavbarComponent implements OnInit {
  isAuthUser: boolean = false;
  isAdminUser: boolean = false;
  isAdminPlatform: boolean = false;
  loading: boolean = true;
  error: any;

  private getLoggedUserUseCase = inject(GetLoggedUserUseCase);
  private logoutUserUseCase = inject(LogoutUserUseCase);
  private router = inject(Router);

  ngOnInit(): void {
    this.getLoggedUserUseCase.execute().subscribe({
      next: (v) => {
        if(v) {
          this.isAuthUser = true;
          if(v.role == "Admin") {
            this.isAdminUser = true;
            this.isAdminPlatform = true;
          } else {
            this.isAdminUser = false;
            this.isAdminPlatform = false;
          }
        } else {
          this.isAuthUser = false;
        }
        this.loading = false;
      },
      error: (e) => {
        this.error = e;
        this.loading = false;
      }
    });

    if(this.isAuthUser) {
      if(this.isAdminPlatform) {
        this.router.navigate(['/admin/users']);
      } else {
        this.router.navigate(['/user']);
      }
    }
  }

  logout() {
    this.logoutUserUseCase.execute();
    this.router.navigate(['/auth/login']);
  }

  switchPlatform() {
    this.isAdminPlatform = !this.isAdminPlatform;
    if(this.isAdminPlatform) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  }

}