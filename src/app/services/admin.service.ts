import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateUser } from "../models/create-user";
import { UserResponse } from "../models/user-response";
import { UsersResponse } from "../models/users-response";

@Injectable()
export class AdminService {

    constructor(private httpClient: HttpClient) { }

    url = "http://localhost:5000/api/admin";

    getUsers(categoryName: string): Observable<UsersResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer: " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWMzMjJjYWM1MjBkMTM1NDM1NTI2MyIsIm5hbWUiOiJIQiBFbXJlIFRhxZ_Dp8SxIiwiaWF0IjoxNjc1MTYyNzYxLCJleHAiOjE2NzUxNjYzNjF9.qeJLa_v4RNt2fo9DKJ0WMQuDoCiSUkxeEb9RmXQA3dQ"
            })
        }

        let newUrl = this.url;
        if(categoryName) newUrl += '/' + categoryName;

        return this.httpClient.get<UsersResponse>(newUrl, httpOptions)
    }

    getUserById(userId: string): Observable<UserResponse> {
        return this.httpClient.get<UserResponse>(this.url + '/user/' + userId)
    }

    registerUser(user: CreateUser): Observable<UserResponse> {
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Authorization": "Bearer: " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWMzMjJjYWM1MjBkMTM1NDM1NTI2MyIsIm5hbWUiOiJIQiBFbXJlIFRhxZ_Dp8SxIiwiaWF0IjoxNjc1MTYyNzYxLCJleHAiOjE2NzUxNjYzNjF9.qeJLa_v4RNt2fo9DKJ0WMQuDoCiSUkxeEb9RmXQA3dQ"
            })
        }

        return this.httpClient.post<UserResponse>(this.url + '/register', user, httpOptions)
    }

}