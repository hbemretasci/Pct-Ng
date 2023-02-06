import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
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

}