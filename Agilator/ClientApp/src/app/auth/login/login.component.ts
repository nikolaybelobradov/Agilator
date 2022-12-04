import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAuthResponseDto } from 'src/app/shared/interfaces/dtos/IAuthResponseDto';
import { IUserLoginDto } from 'src/app/shared/interfaces/dtos/IUserLoginDto';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService) { };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
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
          this.authService.isAuthenticated(response.isSuccessful);
          console.log("Successful login")
        } ,
        error: (err: HttpErrorResponse) => console.log(err.error.errors)
      });
  }

}
