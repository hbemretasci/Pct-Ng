import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { BehaviorSubject, exhaustMap, map, Observable, take, tap } from "rxjs";
import { LoggedUser } from "../../domain/model/logged-user";
import { LoginModel } from "../../domain/model/login.model";
import { AuthRepository } from "../../domain/repository/auth.repository";
import { StoraggedUserEntity } from "../local/storagged-user.entity";
import { LoginImplementationMapper } from "../mapper/login-imp.mapper";
import { LoginResponseDto } from "../remote/login-response.dto";

export class AuthImpRepository extends AuthRepository {
    private _httpClient = inject(HttpClient);
    public override user = new BehaviorSubject<LoggedUser>(null);

    url = "http://localhost:5000/api/auth";
    
    loginMapper = new LoginImplementationMapper();

    loginUser(params: { email: string; password: string; }): Observable<LoginModel> {
        return this._httpClient.post<LoginResponseDto>(this.url + '/login', params)
        .pipe( 
            map(r => this.loginMapper.mapTo(r))
        )
    }

    removeLocalStorage(key: string) {
        localStorage.removeItem(key);
    }

    setLocalStorage(key: string, value: StoraggedUserEntity) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key: string): StoraggedUserEntity {
        return JSON.parse(localStorage.getItem(key));
    }

    isLoggedUserAdmin(): Observable<boolean> {
        return this.user.pipe(
            map(user => {
                if((user) && (user.role == "Admin")) {
                    return true;
                } else {
                    return false;
                }
            }),
            tap(isAdmin => {
                return isAdmin;
            })
        );
    }

    isLoggedUser(): Observable<boolean> {
        return this.user.pipe(
            map(user => {
                if(user) {
                    return true;
                } else {
                    return false;
                }
            }),
            tap(isUser => {
                return isUser;
            })
        );
    }

    addTokenToRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const updatedRequest = req.clone({
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                        "Authorization": "Bearer: " + user.token
                    })
                })
                return next.handle(updatedRequest);
            })
        )
    }

    getUser(): BehaviorSubject<LoggedUser> {
        return this.user;
    }

}