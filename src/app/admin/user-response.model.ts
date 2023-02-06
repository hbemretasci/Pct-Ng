import { User } from "./user.model";

export interface UserResponse {
    success: boolean,
    data: User
}