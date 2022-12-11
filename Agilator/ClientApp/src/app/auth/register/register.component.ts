import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserRegistrationDto } from 'src/app/shared/interfaces/dtos/IUserRegistrationDto';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;

  constructor(private authService: AuthService, private router: Router) { };

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  public register = (registerFormValue: any) => {

    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: IUserRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    };

    this.authService.register("api/authentication/registration", user).subscribe({
      next: (_) => this.router.navigate([`/auth/login`]),
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        this.showError = true;
      }
    });
  }
}
