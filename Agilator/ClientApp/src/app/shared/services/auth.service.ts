import { Injectable } from '@angular/core';
import { IUserRegistrationDto } from '../interfaces/dtos/Auth/IUserRegistrationDto';
import { IUserLoginDto } from '../interfaces/dtos/Auth/IUserLoginDto';
import { IAuthResponseDto } from '../interfaces/dtos/Auth/IAuthResponseDto';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getRoute } from './helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register (route: string, body: IUserRegistrationDto) {
    return this.http.post<IAuthResponseDto> (getRoute(route), body);
  }

  login (route: string, body: IUserLoginDto) {
    return this.http.post<IAuthResponseDto> (getRoute(route), body);
  }

  logout() {
    localStorage.removeItem("token");
    this.authChangeSub.next(false);
  }

  isAuthenticated() {    
    const token = localStorage.getItem("token");

    if(token && !this.jwtHelper.isTokenExpired(token)){
      this.authChangeSub.next(true);
      return true;
    }

    return false;
  }
}
