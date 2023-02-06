import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { AdminComponent } from "./admin-home/admin-home.component";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    {
      path: '',
      component: AdminComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: UsersComponent },
        { path: 'register', component: UserCreateComponent },
        { path: ':roleName', component: UsersComponent },
        { path: 'user/:userId', component: UserDetailsComponent }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule {

}