import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserCreateProjectComponent } from './presentation/user-create-project/user-create-project.component';
import { UserHomeComponent } from './presentation/user-home/user-home.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserCreateProjectComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
