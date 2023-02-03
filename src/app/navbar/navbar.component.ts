import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthUser: boolean = false;
  isAdminUser: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthUser = !!user;
    })
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }

}
