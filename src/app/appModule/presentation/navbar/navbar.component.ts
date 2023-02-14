import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserUseCase } from '../../../auth/domain/use-case/get-user.usecase';
import { IsLoggedUserAdminUseCase } from '../../../auth/domain/use-case/is-logged-user-admin.usecase';
import { IsLoggedUserUseCase } from '../../../auth/domain/use-case/is-logged-user.usecase';
import { LogoutUserUseCase } from '../../../auth/domain/use-case/logout-user.usecase';

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

  private isLoggedUserAdminUseCase = inject(IsLoggedUserAdminUseCase);
  private isLoggedUserUseCase = inject(IsLoggedUserUseCase);
  private logouUserUseCase = inject(LogoutUserUseCase);
  //private getUserUseCase = inject(GetUserUseCase);
  private router = inject(Router);

  ngOnInit(): void {
    this.isLoggedUserUseCase.execute().subscribe({
      next: (v) => {
        this.isAuthUser = v
      }, 
      error: (e) => {
        this.error = e
        this.loading = false;
      }
    });

    this.isLoggedUserAdminUseCase.execute().subscribe({
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
    this.logouUserUseCase.execute();
    this.router.navigate(['/auth/login']);
  }

}