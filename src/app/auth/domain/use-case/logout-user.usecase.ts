import { inject, Injectable } from "@angular/core";
import { AuthRepository } from "../../data/auth.repository";

@Injectable({
    providedIn: 'root'
})
export class LogoutUserUseCase {

    private authRepository = inject(AuthRepository);

    execute() {
        this.authRepository.user.next(null);
        this.authRepository.removeLocalStorage("user");
    }
}