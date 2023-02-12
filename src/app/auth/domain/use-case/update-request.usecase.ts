import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRepository } from "../repository/auth.repository";

export class UpdateRequestUseCase {
    private _authRepository = inject(AuthRepository);

    execute(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._authRepository.addTokenToRequest(req, next);
    }
}