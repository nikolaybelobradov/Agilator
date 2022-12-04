import { Injectable } from '@angular/core';
import { IUserRegistrationDto } from '../shared/interfaces/dtos/IUserRegistrationDto';
import { IUserLoginDto } from '../shared/interfaces/dtos/IUserLoginDto';
import { IAuthResponseDto } from '../shared/interfaces/dtos/IAuthResponseDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public register = (route: string, body: IUserRegistrationDto) => {
    return this.http.post<IAuthResponseDto> (this.createCompleteRoute(route, environment.baseUrl), body);
  }

  public login = (route: string, body: IUserLoginDto) => {
    return this.http.post<IAuthResponseDto> (this.createCompleteRoute(route, environment.baseUrl), body);
  }

  public logout = () => {
    localStorage.removeItem("token");
  }

  private createCompleteRoute = (route: string, baseUrl: string) => {
    return `${baseUrl}/${route}`;
  }
}
