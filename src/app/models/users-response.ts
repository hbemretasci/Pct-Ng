import { User } from "./user";

export interface UsersResponse {
    success: boolean,
    data: User[]
}