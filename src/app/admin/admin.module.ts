import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminComponent } from "./admin-home/admin-home.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { RoleComponent } from "./role/role.component";
import { SummaryPipe } from "./summary.pipe";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserFilterPipe } from "./user-filter.pipe";
import { UsersComponent } from "./users/users.component";

@NgModule({
    declarations: [
        UsersComponent,
        UserDetailsComponent,
        SummaryPipe,
        UserFilterPipe,
        RoleComponent,
        UserCreateComponent,
        AdminComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AdminRoutingModule,
        SharedModule
    ],
    exports: [
        UsersComponent,
        UserDetailsComponent,
        SummaryPipe,
        UserFilterPipe,
        RoleComponent,
        UserCreateComponent,
        AdminComponent
    ]
})
export class AdminModule {

}