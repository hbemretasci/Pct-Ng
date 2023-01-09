import { Category } from "./category";

export class CategoryRepository {
    private categories: Category[];

    constructor() {
        this.categories = [
            {id: 1, name: "Admin"},
            {id: 2, name: "Supervisor"},
            {id: 3, name: "User"}
        ];
    }

    getCategories() {
        return this.categories;
    }

}