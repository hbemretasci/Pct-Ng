import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { UserModel } from "../model/user.model";
import { AdminRepository } from "../repository/admin.repository";

export class GetUserByIdUseCase implements UseCase<{ userId: string }, UserModel> {
    private _adminRepository = inject(AdminRepository);

    execute(
        params: { userId: string },
    ): Observable<UserModel> {
        return this._adminRepository.getUserById(params);
    }
}