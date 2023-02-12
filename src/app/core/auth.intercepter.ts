import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UpdateRequestUseCase } from "../auth/domain/use-case/update-request.usecase";

@Injectable()
export class AuthIntercepter implements HttpInterceptor {

    private _updateRequestUseCase = inject(UpdateRequestUseCase);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._updateRequestUseCase.execute(req, next);
    }
}