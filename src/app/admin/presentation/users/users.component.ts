import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../shared/alertify.service';
import { UserModel } from '../../domain/user.model';
import { GetUsersByCategoryUseCase } from '../../domain/use-case/get-users-bycategory.usecase';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [GetUsersByCategoryUseCase]
})
export class UsersComponent implements OnInit {
  title: String = "User List";
  filterText: string = "";
  loading: boolean = true;
  users: UserModel[];
  error: any;
  
  private _activatedRoute = inject(ActivatedRoute);
  private _alertify = inject(AlertifyService);
  private _getUsersByCategoryUseCase = inject(GetUsersByCategoryUseCase);

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._getUsersByCategoryUseCase.execute(params["roleName"]).subscribe({
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

      this._alertify.success(user.fullName + ' added.');
    } else {
      $event.target.innerText = "Add";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

      this._alertify.error(user.fullName + ' removed.');
    }
  }

  closeErrorDialog() {
    this.error = null;
  }

}