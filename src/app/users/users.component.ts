import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserRepository } from '../models/user.repository';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[];
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.users = this.userRepository.getUsers();
  }

}
