import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../domain/user.model';
import { GetUsersByCategoryUseCase } from '../../domain/use-case/get-users-bycategory.usecase';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [GetUsersByCategoryUseCase]
})
export class AdminUsersComponent implements OnInit {
  title: String = "User List";
  filterText: string = "";
  loading: boolean = true;
  users: UserModel[];
  error: any;
  
  private activatedRoute = inject(ActivatedRoute);
  private getUsersByCategoryUseCase = inject(GetUsersByCategoryUseCase);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getUsersByCategoryUseCase.execute(params["roleName"]).subscribe({
        next: (v) => {
          this.users = v;
          this.loading = false;  
        }, 
        error: (e) => {
          this.error = e
          this.loading = false;
        }
      });
    });
  }

  addToList($event: any, user: UserModel) {
    if($event.target.classList.contains('btn-primary')) {
      $event.target.innerText = "Remove";
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

      // this.alertify.success(user.fullName + ' added.');
    } else {
      $event.target.innerText = "Add";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      // this.alertify.error(user.fullName + ' removed.');
    }
  }

  closeErrorDialog() {
    this.error = null;
  }

}