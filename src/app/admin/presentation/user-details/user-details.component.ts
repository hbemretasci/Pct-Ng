import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../domain/user.model';
import { GetUserByIdUseCase } from '../../domain/use-case/get-user-byid.usecase';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [GetUserByIdUseCase]
})
export class UserDetailsComponent implements OnInit {
  title: String = "User";
  loading: boolean = true;
  user: UserModel;
  error: any;

  private _activatedRoute = inject(ActivatedRoute);
  private _getUserByIdUseCase = inject(GetUserByIdUseCase);

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this._getUserByIdUseCase.execute(params["userId"]).subscribe({
        next: (v) => {
          this.user = v
          this.loading = false;  
        },
        error: (e) => {
          this.error = e;
          this.loading = false;
        } 
      });
    });
  }

  closeErrorDialog() {
    this.error = null;
  }

}
