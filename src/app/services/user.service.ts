import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UsersResponse } from "../models/user";

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    url = "http://localhost:5000/api/admin";

    getUsers(categoryName: string): Observable<UsersResponse> {
        let newUrl = this.url;

        if(categoryName) newUrl += '/role/' + categoryName.toLowerCase();

        return this.httpClient.get<UsersResponse>(newUrl)
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