import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUserRegistrationDto } from 'src/app/shared/interfaces/dtos/Auth/IUserRegistrationDto';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { };

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  public register = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    const user: IUserRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    };

    this.authService.register("api/authentication/registration", user).subscribe({
      next: () => {
        this.toastr.success('Successful registration.', 'Message', { timeOut: 2500 });
        this.router.navigate([`/auth/login`])
      },
      error: () => {
        this.toastr.error('Incorrect data entered.', 'Message', { timeOut: 2500 });
      }
    });
  }
}
