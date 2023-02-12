import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs"
import { StoraggedUserEntity } from "../../data/local/storagged-user.entity";
import { LoggedUser } from "../model/logged-user";
import { LoginModel } from "../model/login.model";

export abstract class AuthRepository {
    user: any;
    abstract loginUser(params: { email: string, password: string }): Observable<LoginModel>
    abstract removeLocalStorage(key: string): void
    abstract setLocalStorage(key: string, value: StoraggedUserEntity): void
    abstract getLocalStorage(key: string): StoraggedUserEntity
    abstract isLoggedUserAdmin(): Observable<boolean>
    abstract isLoggedUser(): Observable<boolean>
    abstract addTokenToRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    abstract getUser(): BehaviorSubject<LoggedUser>
}