import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from '../models/create-user';
import { User } from '../models/user';
import { UserOrganizationRepository } from '../repository/user-organization.repository';
import { UserRoleRepository } from '../repository/user-role.repository';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [AdminService]
})
export class UserCreateComponent {
  title: String = "Create User";

  loading: boolean = false;
  user: User;
  error: any;

  organizations: string[]; 
  roles: string[]
  userOrganizationRepository: UserOrganizationRepository;
  userRoleRepository: UserRoleRepository;

  createUserForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    department: new FormControl(""),
    title: new FormControl(""),
    organization: new FormControl("Company"),
    organizationName: new FormControl("", [Validators.required]),
    role: new FormControl("User")
  })

  get name() {
    return this.createUserForm.get('name');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get organizationName() {
    return this.createUserForm.get('organizationName');
  }

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {
    this.userOrganizationRepository = new UserOrganizationRepository();
    this.organizations = this.userOrganizationRepository.getOrganizations();
    
    this.userRoleRepository = new UserRoleRepository();
    this.roles = this.userRoleRepository.getuserRoles();
  }

  registerUser() {
    this.loading = true;

    const createUser: CreateUser = {
        name: this.createUserForm.value.name,
        email: this.createUserForm.value.email,
        role: this.createUserForm.value.role,
        password: this.createUserForm.value.password,
        organization: this.createUserForm.value.organization,
        organizationName: this.createUserForm.value.organizationName,
        title: this.createUserForm.value.title,
        department: this.createUserForm.value.department,
        disabled: false  
    }

    this.adminService.registerUser(createUser).subscribe({
      next: (v) => {
        this.user = v.data;
        this.loading = false;  
        this.router.navigate(['/admin/user/', this.user._id]);
      },
      error: (e) => {
        this.error = e;
        this.loading = false;
      } 
    });
  }

  clearForm() {
    this.createUserForm.patchValue({
      name: '',
      email: '',
      password: '',
      department: '',
      title: '',
      organization: 'Company',
      organizationName: '',
      role: 'User'
    });
  }

}
