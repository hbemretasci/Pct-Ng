import { Component } from '@angular/core';
import { UserRoleRepository } from '../models/user-role.repository';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  roles: string[]; 
  userRoleRepository: UserRoleRepository;
  selectedRole: string;
  displayAllRoles: boolean = true;

  constructor() {
    this.userRoleRepository = new UserRoleRepository();
    this.roles = this.userRoleRepository.getuserRoles();
  }

  selectRole(role?: string) {
    if(role) {
      this.selectedRole = role;
      this.displayAllRoles = false;
    } else {
      this.selectedRole = null;
      this.displayAllRoles = true;
    }
  }

}
