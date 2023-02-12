import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { IsLoggedUserUseCase } from "./domain/use-case/is-logged-user.usecase";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private _isLoggedUserUseCase = inject(IsLoggedUserUseCase);
    private _router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this._isLoggedUserUseCase.execute().pipe(
            map(user => {
                return !!user;
            }),
            tap(isAuth => {
                if(!isAuth) {
                    this._router.navigate(['auth/login']);
                }
            })
        );
    }

}