import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
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
