import { BehaviorSubject } from "rxjs";
import { LoggedUser } from "../logged-user";
import { AuthRepository } from "../../data/auth.repository";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GetUserUseCase {

    private authRepository = inject(AuthRepository);

    execute(): BehaviorSubject<LoggedUser> {
        return this.authRepository.getUser();
    }
}