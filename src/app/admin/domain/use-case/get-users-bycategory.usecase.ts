import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { UserModel } from "../model/user.model";
import { AdminRepository } from "../repository/admin.repository";

export class GetUsersByCategoryUseCase implements UseCase<{ categoryName: string }, UserModel[]> {
    private _adminRepository = inject(AdminRepository);

    execute(
        params: { categoryName: string },
    ): Observable<UserModel[]> {
        return this._adminRepository.getUsersByCategory(params);
    }
}