import { Component } from '@angular/core';

@Component({
  selector: 'admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent {
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