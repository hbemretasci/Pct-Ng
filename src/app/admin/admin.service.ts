import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateUser } from "./create-user.model";
import { UserResponse } from "./user-response.model";
import { UsersResponse } from "./users-response.model";

@Injectable()
export class AdminService {
    url = "http://localhost:5000/api/admin";

    constructor(private httpClient: HttpClient) { }

    getUsers(categoryName: string): Observable<UsersResponse> {
        let newUrl = this.url;
        if(categoryName) newUrl += '/' + categoryName;
        return this.httpClient.get<UsersResponse>(newUrl)
    }

    getUserById(userId: string): Observable<UserResponse> {
        return this.httpClient.get<UserResponse>(this.url + '/user/' + userId)
    }

    registerUser(user: CreateUser): Observable<UserResponse> {
        return this.httpClient.post<UserResponse>(this.url + '/register', user)
    }

}