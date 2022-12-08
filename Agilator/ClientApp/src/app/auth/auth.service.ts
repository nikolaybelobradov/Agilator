import { Injectable } from '@angular/core';
import { IUserRegistrationDto } from '../shared/interfaces/dtos/IUserRegistrationDto';
import { IUserLoginDto } from '../shared/interfaces/dtos/IUserLoginDto';
import { IAuthResponseDto } from '../shared/interfaces/dtos/IAuthResponseDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Subject } from 'rxjs/internal/Subject';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register (route: string, body: IUserRegistrationDto) {
    return this.http.post<IAuthResponseDto> (this.getRoute(route), body);
  }

  login (route: string, body: IUserLoginDto) {
    return this.http.post<IAuthResponseDto> (this.getRoute(route), body);
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

  private getRoute = (route: string) => {
    return `${environment.baseUrl}/${route}`;
  }
}
