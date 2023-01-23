import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UsersResponse } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  title: String = "User List";
  filterText: string = "";

  users: User[] = [];
  error: any = null;
  
  constructor(
    private alertify: AlertifyService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getUsers(params["roleName"]).subscribe({
        next: (v) => this.users = v.data,
        error: (e) => this.error = e
      });
    });
  }

  addToList($event: any, user: User) {
    if($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = "Remove";
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      this.alertify.success(user.name + ' added.');
    } else {
      $event.target.innerText = "Add";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      this.alertify.error(user.name + ' removed.');
    }
  }

}
