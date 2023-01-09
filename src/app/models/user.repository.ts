import { User } from "./user";

export class UserRepository {
    private users: User[];

    constructor() {
        this.users = [
            {id: 1, title: "User-1", description: "User-1 Description", imageUrl: "1.jpeg"},
            {id: 2, title: "User-2", description: "User-2 Description", imageUrl: "2.jpeg"},
            {id: 3, title: "User-3", description: "User-3 Description", imageUrl: "3.jpeg"},
            {id: 4, title: "User-4", description: "User-4 Description", imageUrl: "4.jpeg"},
            {id: 4, title: "User-4", description: "User-4 Description", imageUrl: "4.jpeg"}
        ];
    }

    getUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User | undefined {
        return this.users.find(i=>i.id == id);
    }

}