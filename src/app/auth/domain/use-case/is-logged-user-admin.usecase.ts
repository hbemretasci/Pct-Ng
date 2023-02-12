import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthRepository } from "../repository/auth.repository";

export class IsLoggedUserAdminUseCase {
    private _authRepository = inject(AuthRepository);

    execute(): Observable<boolean> {
        return this._authRepository.isLoggedUserAdmin();
    }
}