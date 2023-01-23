export interface User {
    _id: string,
    name: string,
    email: string,
    role: string,
    organization: string,
    organizationName: string,
    title: string,
    department: string,
    disabled: boolean,
    createdAt: Date
}

export interface UsersResponse {
    success: boolean,
    data: User[]
}