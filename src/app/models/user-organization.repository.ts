export class UserOrganizationRepository {
    private organizations: string[];

    constructor() {
        this.organizations = ["Company", "Topunit"];
    }

    getOrganizations() {
        return this.organizations;
    }

}