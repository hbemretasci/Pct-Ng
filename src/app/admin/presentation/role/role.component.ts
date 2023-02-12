import { Component } from '@angular/core';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  roles: string[] = ["Admin", "Supervisor", "User"];
  selectedRole: string;
  displayAllRoles: boolean = true;

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