import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoggedUser } from "./logged-user.model";
import { LoginResponse } from "./login-response.model";
import { StoraggedUser } from "./storagged-user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = "http://localhost:5000/api/auth";

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    user = new BehaviorSubject<LoggedUser>(null);

    loginUser(email: string, password: string): Observable<LoginResponse> {
        const user = {
            email: email,
            password: password 
        }

        return this.httpClient.post<LoginResponse>(this.url + '/login', user)
        .pipe( 
            tap(response => {
                this.handleAuthentication(
                    response.data.name,
                    response.data.email,
                    response.data.role,
                    response.access_token,
                    parseInt(response.expiresIn)
                )
            })
        )
    }

    logoutUser() {
        this.user.next(null);
        localStorage.removeItem("user");
        this.router.navigate(['auth/login']);
    }

    autoLogin() {
        const storaggedUser = JSON.parse(localStorage.getItem("user"));
        if(!storaggedUser) return;

        const loggedUser = new LoggedUser(
            storaggedUser._name,
            storaggedUser._email, 
            storaggedUser._role, 
            storaggedUser._token, 
            new Date(parseInt(storaggedUser._tokenExpirationDate))
        );
        if(loggedUser.token) this.user.next(loggedUser);
    }

    handleAuthentication(name: string, email: string, role: string, token: string, expiresIn: number) {
        const validityTime: number = (new Date().getTime()) + expiresIn;
        const loggedUser = new LoggedUser(name, email, role, token, new Date(validityTime));
        this.user.next(loggedUser);
        localStorage.setItem("user", JSON.stringify(new StoraggedUser(name, email, role, token, validityTime.toString())));
    }

}