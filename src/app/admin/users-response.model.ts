import { User } from "./user.model";

export interface UsersResponse {
    success: boolean,
    data: User[]
}