export interface CreateUser {
    name: string,
    email: string,
    role: string,
    password: string,
    organization: string,
    organizationName: string,
    title: string,
    department: string,
    disabled: boolean
}