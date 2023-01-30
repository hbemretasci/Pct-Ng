import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'admin', component: UsersComponent },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin/register', component: UserCreateComponent },
  { path: 'admin/:roleName', component: UsersComponent },
  { path: 'admin/user/:userId', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
