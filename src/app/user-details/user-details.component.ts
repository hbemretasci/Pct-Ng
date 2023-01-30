import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserService]
})
export class UserDetailsComponent implements OnInit {
  title: String = "User";

  loading: boolean = true;
  user: User;
  error: any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getUserById(params["userId"]).subscribe({
        next: (v) => {
          this.user = v.data;
          this.loading = false;  
        },
        error: (e) => {
          this.error = e;
          this.loading = false;
        } 
      });
    });
  }

  addToList($event: any, user: User) {
  }


}
