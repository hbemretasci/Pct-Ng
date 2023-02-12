import { inject } from "@angular/core";
import { LoggedUser } from "../model/logged-user";
import { AuthRepository } from "../repository/auth.repository";

export class AutoLoginUseCase {
    private _authRepository = inject(AuthRepository);

    execute() {
        const storaggedUser = this._authRepository.getLocalStorage("user");
        if(!storaggedUser) return;

        const loggedUser = new LoggedUser(
            storaggedUser.name,
            storaggedUser.email, 
            storaggedUser.role, 
            storaggedUser.token, 
            new Date(parseInt(storaggedUser.tokenExpirationDate))
        );
        if(loggedUser.token) this._authRepository.user.next(loggedUser);
    }
}