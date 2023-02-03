export class StoraggedUser  {
    
    constructor(
        private name: string,
        private email: string,
        private role: string,
        private token: string,
        private tokenExpirationDate: string
    ) { }
    
}   