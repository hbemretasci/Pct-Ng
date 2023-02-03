import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AdminService]
})
export class UsersComponent implements OnInit {
  title: String = "User List";
  filterText: string = "";

  loading: boolean = true;
  users: User[];
  error: any;
  
  constructor(
    private alertify: AlertifyService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.adminService.getUsers(params["roleName"]).subscribe({
        next: (v) => {
          this.users = v.data;
          this.loading = false;  
        }, 
        error: (e) => {
          this.error = e
          this.loading = false;
        }
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