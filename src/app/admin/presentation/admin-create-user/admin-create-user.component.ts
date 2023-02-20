import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../domain/user.model';
import { UserRegisterUseCase } from '../../domain/use-case/user-register.usecase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css'],
  providers: [UserRegisterUseCase]
})
export class AdminCreateUserComponent {
  title: String = "Create User";
  loading: boolean = false;
  user: UserModel;
  error: any;

  organizations: string[] = ["Company", "Topunit"]; 
  roles: string[] = ["Admin", "Supervisor", "User"];

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

  private userRegisterUseCase = inject(UserRegisterUseCase);
  private snackBar = inject(MatSnackBar);

  registerUser() {
    const createUser = {
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

    this.loading = true;
    this.userRegisterUseCase.execute(createUser).subscribe({
      next: (v) => {
        this.user = v;
        this.loading = false;  
        this.snackBar.open(this.user.fullName + ' user created.', '', {
          duration: 3000
        });
      },
      error: (e) => {
        this.error = e;
        this.loading = false;
      } 
    });
  }

  clearForm(): void {
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

  closeErrorDialog(): void {
    this.error = null;
  }

}
