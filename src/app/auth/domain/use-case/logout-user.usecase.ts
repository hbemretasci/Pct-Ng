import { inject } from "@angular/core";
import { AuthRepository } from "../repository/auth.repository";

export class LoginOutUseCase {
    private _authRepository = inject(AuthRepository);

    execute() {
        this._authRepository.user.next(null);
        this._authRepository.removeLocalStorage("user");
    }
}