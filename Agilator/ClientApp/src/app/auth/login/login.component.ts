import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthResponseDto } from 'src/app/shared/interfaces/dtos/IAuthResponseDto';
import { IUserLoginDto } from 'src/app/shared/interfaces/dtos/IUserLoginDto';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl!: string;
  loginForm!: FormGroup;
  errorMessage: string = '';
  showError!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login = (loginFormValue: any) => {
    const formValues = { ...loginFormValue };

    const user: IUserLoginDto = {
      email: formValues.email,
      password: formValues.password,
    };

    this.authService.login("api/authentication/login", user).subscribe({
      next: (response: IAuthResponseDto) => {
        localStorage.setItem("token", response.token);

        if(response.isSuccessful){
          this.authService.isAuthenticated();
        }
        this.router.navigate([this.returnUrl]);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
        if(this.errorMessage == '[object Object]')
        this.errorMessage = 'Email and Password are required';
        this.showError = true;
      }
    });
  }
}
