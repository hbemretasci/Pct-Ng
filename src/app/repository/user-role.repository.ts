export class UserRoleRepository {
    private userRoles: string[];

    constructor() {
        this.userRoles = ["Admin", "Supervisor", "User"];
    }

    getuserRoles() {
        return this.userRoles;
    }

}