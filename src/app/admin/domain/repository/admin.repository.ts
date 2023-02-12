import { Observable } from "rxjs"
import { UserModel } from "../model/user.model"

export abstract class AdminRepository {
    abstract register(params: {
        name: string,
        email: string,
        role: string,
        password: string,
        organization: string,
        organizationName: string;
        title: string,
        department: string,
        disabled: boolean
    }): Observable<UserModel>
    abstract getUserById(params: { userId: string }): Observable<UserModel>
    abstract getUsersByCategory(params: { categoryName: string }): Observable<UserModel[]>
}