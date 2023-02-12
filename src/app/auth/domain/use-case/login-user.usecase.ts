import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { LoggedUser } from "../model/logged-user";
import { LoginModel } from "../model/login.model";
import { AuthRepository } from "../repository/auth.repository";

export class LoginUserUseCase implements UseCase<{ email: string, password: string }, LoginModel> {
    private _authRepository = inject(AuthRepository);

    execute(
        params: { email: string, password: string },
    ): Observable<LoginModel> {
        return this._authRepository.loginUser(params)
        .pipe(
            tap( r => {
                const validityTime: number = (new Date().getTime()) + parseInt(r.expiresIn);
                const loggedUser = new LoggedUser(r.name, r.email, r.role, r.token, new Date(validityTime));
                this._authRepository.user.next(loggedUser);
                this._authRepository.setLocalStorage("user", {
                    name: r.name,
                    email: r.email,
                    role: r.role,
                    token: r.token,
                    tokenExpirationDate: validityTime.toString()    
                });
            })
        )
    }
}