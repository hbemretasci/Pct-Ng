import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthLoginComponent } from "./presentation/auth-login/auth-login.component";
import { AuthProfileComponent } from './presentation/auth-profile/auth-profile.component';

@NgModule({
    declarations: [
        AuthLoginComponent,
        AuthProfileComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ],
    providers: [
        
    ]
})
export class AuthModule {

}