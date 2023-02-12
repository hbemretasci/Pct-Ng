import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRepository } from "../repository/auth.repository";

export class IsLoggedUserUseCase {
    private _authRepository = inject(AuthRepository);

    execute(): Observable<boolean> {
        return this._authRepository.isLoggedUser();
    }
}