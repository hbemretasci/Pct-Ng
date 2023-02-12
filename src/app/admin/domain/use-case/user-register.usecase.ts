import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { UseCase } from "src/app/shared/utils/use-case";
import { UserModel } from "../model/user.model";
import { AdminRepository } from "../repository/admin.repository";

export class UserRegisterUseCase implements UseCase<{
    name: string,
    email: string,
    role: string,
    password: string,
    organization: string,
    organizationName: string;
    title: string,
    department: string,
    disabled: boolean
}, UserModel> {
    private _adminRepository = inject(AdminRepository);

    execute(
        params: {
            name: string,
            email: string,
            role: string,
            password: string,
            organization: string,
            organizationName: string;
            title: string,
            department: string,
            disabled: boolean
        },
    ): Observable<UserModel> {
        return this._adminRepository.register(params);
    }
}