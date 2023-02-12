import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserModel } from "../../domain/model/user.model";
import { AdminRepository } from "../../domain/repository/admin.repository";
import { UserImplementationMapper } from "../mapper/user-imp.mapper";
import { UsersImplementationMapper } from "../mapper/users-imp-mapper";
import { UserResponseDto } from "../remote/user-response.dto";
import { UsersResponseDto } from "../remote/users-response.dto";

export class AdminImpRepository extends AdminRepository {
    private _httpClient = inject(HttpClient);
    
    url = "http://localhost:5000/api/admin";
    
    userMapper = new UserImplementationMapper();
    usersMapper = new UsersImplementationMapper();

    register(params: {
        name: string;
        email: string;
        role: string;
        password: string;
        organization: string;
        organizationName: string;
        title: string;
        department: string;
        disabled: boolean;
    }): Observable<UserModel> {
        return this._httpClient.post<UserResponseDto>(this.url + '/register', params )
        .pipe(
            map(r => this.userMapper.mapTo(r))
        );
    }
    
    getUserById(params: { userId: string }): Observable<UserModel> {
        return this._httpClient.get<UserResponseDto>(this.url + '/user/' + params.userId)
        .pipe(
            map(r => this.userMapper.mapTo(r))
        );
    }

    getUsersByCategory(params: { categoryName: string }): Observable<UserModel[]> {
        let newUrl = this.url;
        if(params.categoryName) newUrl += '/' + params.categoryName;
        
        return this._httpClient.get<UsersResponseDto>(newUrl)
        .pipe(
            map(r => this.usersMapper.mapTo(r))
        );
    } 

}