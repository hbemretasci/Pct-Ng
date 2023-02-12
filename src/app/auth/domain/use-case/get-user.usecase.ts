import { inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoggedUser } from "../model/logged-user";
import { AuthRepository } from "../repository/auth.repository";

export class GetUserUseCase {
    private _authRepository = inject(AuthRepository);

    execute(): BehaviorSubject<LoggedUser> {
        return this._authRepository.getUser();
    }
}