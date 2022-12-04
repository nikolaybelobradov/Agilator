import { Injectable } from '@angular/core';
import { IUserRegistrationDto } from '../shared/interfaces/dtos/IUserRegistrationDto';
import { IUserLoginDto } from '../shared/interfaces/dtos/IUserLoginDto';
import { IAuthResponseDto } from '../shared/interfaces/dtos/IAuthResponseDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient) { }

  register (route: string, body: IUserRegistrationDto) {
    return this.http.post<IAuthResponseDto> (this.createCompleteRoute(route, environment.baseUrl), body);
  }

  login (route: string, body: IUserLoginDto) {
    return this.http.post<IAuthResponseDto> (this.createCompleteRoute(route, environment.baseUrl), body);
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated(false);
  }

  isAuthenticated(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated);
  }

  private createCompleteRoute = (route: string, baseUrl: string) => {
    return `${baseUrl}/${route}`;
  }
}
