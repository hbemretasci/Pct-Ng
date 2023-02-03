import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoggedUser } from "../models/logged-user";
import { LoginResponse } from "../models/login-response";
import { StoraggedUser } from "../models/storagged-user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    url = "http://localhost:5000/api/auth";

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
            storaggedUser.name,
            storaggedUser.email, 
            storaggedUser.role, 
            storaggedUser.token, 
            new Date(parseInt(storaggedUser.tokenExpirationDate))
        );

        console.log(loggedUser);

        if(loggedUser.token) this.user.next(loggedUser);
    }

    handleAuthentication(name: string, email: string, role: string, token: string, expiresIn: number) {
        const validityTime: number = (new Date().getTime()) + expiresIn;
        const loggedUser = new LoggedUser(name, email, role, token, new Date(validityTime));

        console.log(loggedUser);


        this.user.next(loggedUser);
        localStorage.setItem("user", JSON.stringify(new StoraggedUser(name, email, role, token, validityTime.toString())));
    }

}