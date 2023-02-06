export class StoraggedUser  {
    
    constructor(
        private _name: string,
        private _email: string,
        private _role: string,
        private _token: string,
        private _tokenExpirationDate: string
    ) { }
    
}   