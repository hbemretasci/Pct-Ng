import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { GetUserUseCase } from '../auth/domain/use-case/get-user.usecase';
import { IsLoggedUserAdminUseCase } from '../auth/domain/use-case/is-logged-user-admin.usecase';
import { IsLoggedUserUseCase } from '../auth/domain/use-case/is-logged-user.usecase';
import { LoginOutUseCase } from '../auth/domain/use-case/logout-user.usecase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loading: boolean = true;
  isAuthUser: boolean = false;
  isAdminUser: boolean = false;
  error: any;

  private _isLoggedUserAdminUseCase = inject(IsLoggedUserAdminUseCase);
  private _isLoggedUserUseCase = inject(IsLoggedUserUseCase);
  private _loginOutUseCase = inject(LoginOutUseCase);
  // private _getUserUseCase = inject(GetUserUseCase);
  private _router = inject(Router);

  ngOnInit(): void {
    this._isLoggedUserUseCase.execute().subscribe({
      next: (v) => {
        this.isAuthUser = v
      }, 
      error: (e) => {
        this.error = e
        this.loading = false;
      }
    });

    this._isLoggedUserAdminUseCase.execute().subscribe({
      next: (v) => {
        this.isAdminUser = v
        this.loading = false;  
      }, 
      error: (e) => {
        this.error = e
        this.loading = false;
      }
    });

    // this._getUserUseCase.execute().subscribe(user => {
    //   this.isAuthUser = !!user;
    //   if((this.isAuthUser) && (user.role == "Admin")) {
    //     this.isAdminUser = true
    //   } else {
    //     this.isAdminUser = false;
    //   }
    // });
    
  }

  logout() {
    this._loginOutUseCase.execute();
    this._router.navigate(['/auth/login']);
  }

}