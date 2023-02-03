import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FooterComponent } from './footer/footer.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { AlertifyService } from './services/alertify.service';
import { RoleComponent } from './role/role.component';
import { AppRoutingModule } from './app-routing.module';
import { UserCreateComponent } from './user-create/user-create.component';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthIntercepter } from './services/auth.intercepter';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    UserDetailsComponent,
    FooterComponent,
    SummaryPipe,
    UserFilterPipe,
    RoleComponent,
    UserCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
