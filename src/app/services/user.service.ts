import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CreateUser } from "../models/create-user";
import { UserResponse } from "../models/user-response";
import { UsersResponse } from "../models/users-response";

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    url = "http://localhost:5000/api/admin";

    getUsers(categoryName: string): Observable<UsersResponse> {
        let newUrl = this.url;
        if(categoryName) newUrl += '/' + categoryName;

        return this.httpClient.get<UsersResponse>(newUrl)
        .pipe(catchError(this.handleError))
    }

    getUserById(userId: string): Observable<UserResponse> {
        return this.httpClient.get<UserResponse>(this.url + '/user/' + userId)
        .pipe(catchError(this.handleError))
    }

    registerUser(user: CreateUser): Observable<UserResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: access_token'
            })
        }

        return this.httpClient.post<UserResponse>(this.url + '/register', user, httpOptions)
        .pipe(catchError(this.handleError))
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';

        if((err.error.success == false) && (err.error.message.length > 0)) {
            errorMessage = err.error.message;
        } else {
            if (err.error instanceof ErrorEvent) {
                // Client-side errors
                errorMessage = `Client Error: ${err.error.message}`;
            } else {
                // Server-side errors
                switch(err.status) {
                    case 0:
                        errorMessage = "Server Error: Server is unreachable.";
                        break;
                    case 404:
                        errorMessage = `Server Error: ${err.url} not found.`;
                        break;
                    default:
                        errorMessage = `Server Error: ${err.message}`;
                }
            }
        }
        return throwError(() => new Error(errorMessage));
    }

}